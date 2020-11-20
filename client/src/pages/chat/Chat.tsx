import React, {ReactElement, RefObject} from 'react';
import socketIOClient from 'socket.io-client';
import {ChatProps, ChatState, NotificationEvents, User} from './Chat.interfaces';
import {NavLink} from 'react-router-dom';

class Chat extends React.Component<ChatProps, ChatState> {
    private socket: SocketIOClient.Socket;
    private readonly userName: string;
    private readonly textMessageRef: RefObject<HTMLInputElement>;

    constructor(props: ChatProps) {
        super(props);
        // @ts-ignore
        this.userName = this.props.location.state;
        this.state = {
            messages: [],
            isActive: false
        };
        this.socket = this.getSocketConnection();
        this.textMessageRef = React.createRef<HTMLInputElement>();
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.leaveFormChat = this.leaveFormChat.bind(this);
    }

    getSocketConnection() {
        const url: string = process.env.REACT_APP_BASE_URL || '';
        return socketIOClient(url);
    }

    addSocketListeners() {
        this.socket.on(NotificationEvents.NEW_JOIN, (user: User) => {
            this.setState(state => {
                return {
                    isActive: true,
                    messages: [...state.messages, `${user.name} was joined in the chat`]
                };
            });
        });
        this.socket.on(NotificationEvents.NEW_LEAVE, (user: User) => {
            this.setState(state => {
                return {
                    messages: [...state.messages, `${user.name} left the chat`],
                };
            });
        });
        this.socket.on(NotificationEvents.NEW_MESSAGE, (user: User, message: string) => {
            this.setState(state => {
                return {
                    messages: [...state.messages, `${user.name}: ${message}`]
                };
            });
        });
    }

    componentDidMount(){
        this.addSocketListeners();
        this.socket.emit(NotificationEvents.JOIN, this.userName);
    }

    componentWillUnmount(){
        this.socket.disconnect();
    }
    handleSendMessage() {
        const message: string = this.textMessageRef.current?.value || '';
        this.socket.emit(NotificationEvents.MESSAGE, message);
        this.textMessageRef.current && (this.textMessageRef.current.value = '');
    }

    leaveFormChat() {
        this.socket.emit(NotificationEvents.LEAVE);
        this.setState(() => {
            return {
                isActive: false
            }
        })
    }

    render() {
        const {messages, isActive} = this.state;
        const messageItems: ReactElement[] = messages.map((message, index) =>
            <li key={index}>{message}</li>
        );
        const leftChatMessageElement: ReactElement = <><span>You left this chat</span><NavLink  to='/login'>Try again</NavLink></>
        const chatElement = <>
            <span>Chat {this.userName}</span>
            <br/>
            <ul>{messageItems}</ul>
            <br/>
            <input placeholder="Write message..." ref={this.textMessageRef}/>
            <button onClick={this.handleSendMessage}>
                Send
            </button>
            <br/>
            <button onClick={this.leaveFormChat}>
                Leave form chat
            </button>
        </>;
        const content: ReactElement = isActive ? chatElement: leftChatMessageElement;
        return <div>
            {content}
        </div>
    }
}

export default Chat;
