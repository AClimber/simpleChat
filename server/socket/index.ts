import {Server} from 'http';
import {Socket} from 'socket.io'
import {NotificationEvents, User} from '../../common/types';
import {RoomController} from '../controller/roomController';
const SocketIO = require('socket.io');

export class SocketConnection {
    private io: Socket;

    constructor(server: Server) {
        this.io = SocketIO(server);
        this.setRoutes();
    }

    private setRoutes(): void {
        this.io.on(NotificationEvents.CONNECTION, (socket: Socket) => {
            socket.on(NotificationEvents.JOIN, (userName: string) => {
                const user: User = RoomController.createUser(socket.id, userName);
                RoomController.addUser(user);
                this.io.emit(NotificationEvents.NEW_JOIN, user);
            });
            socket.on(NotificationEvents.LEAVE, () => {
                const user: User = RoomController.removeUser(socket.id);
                this.io.emit(NotificationEvents.NEW_LEAVE, user);
            });
            socket.on(NotificationEvents.MESSAGE, (message: string) => {
                const user: User = RoomController.getUser(socket.id);
                this.io.emit(NotificationEvents.NEW_MESSAGE, user, message);
            });
        });
    }
}