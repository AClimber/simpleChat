import React, {ReactElement} from 'react';
import socketIOClient from 'socket.io-client';

interface UserRoom {
    id: string;
    name: string;
}
interface ChatProps {}
interface ChatState {
    room: UserRoom[],
    messages: string[]
}
class Chat extends React.Component<ChatProps, ChatState> {
    private socket: SocketIOClient.Socket;
    private readonly userName: string;
    private readonly textMessageRef: any;

    constructor(props: ChatProps) {
        super(props);
        // @ts-ignore
        this.userName = this.props.location.state;
        this.state = {
            room: [],
            messages: []
        };
        this.socket = this.setSocketConnection();
        this.textMessageRef = React.createRef();
        this.handleSendMessage = this.handleSendMessage.bind(this);
        this.leaveFormChat = this.leaveFormChat.bind(this);
    }

    setSocketConnection() {
        const url: string = process.env.REACT_APP_BASE_URL || '';
        let socket: SocketIOClient.Socket = socketIOClient(url);
        socket.on('new_join', (name: string, id: string) => {
            this.setState((state) => {
                return {
                    room: [...state.room, {id, name}],
                    messages: [...state.messages, `${name} was joined in the chat`]
                };
            });
        });
        socket.on('new_leave', (id: string) => {
            this.setState((state) => {
                const leftUser = state.room.find(user => user.id === id);
                const newRoom = state.room.filter(user => user.id !== id);
                return {
                    room: newRoom,
                    messages: [...state.messages, `${leftUser?.name} left the chat`],
                };
            });
        });
        socket.on('new_message', (message: string, id: string) => {
            this.setState((state) => {
                const user = this.state.room.find(user => user.id === id)
                return {
                    room: state.room,
                    messages: [...state.messages, `${user?.name}: ${message}`]
                };
            });
        });
        return socket;
    }

    componentDidMount(){
        this.socket.emit('join', this.userName)
    }

    handleSendMessage() {
        const message: string = this.textMessageRef.current.value;
        this.socket.emit('message', message);
        this.textMessageRef.current.value = '';
    }

    leaveFormChat() {
        this.socket.emit('leave');
    }

    render() {
        const {messages} = this.state;
        const messageItems = messages.map((message) =>
            <li>{message}</li>
        );
        return <div>
            <span>Chat</span>
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
        </div>;
    }
}

export default Chat;
