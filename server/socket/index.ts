import {Server} from 'http';
import {Socket} from 'socket.io'
const SocketIO = require('socket.io');

export class SocketConnection {
    private io: Socket;

    constructor(server: Server) {
        this.io = SocketIO(server);
        this.setRoutes();
    }

    private setRoutes(): void {
        this.io.on('connection', (socket: Socket) => {
            socket.on('join', (userName: string) => {
                this.io.emit('new_join', userName, socket.id);
            });
            socket.on('leave', () => {
                this.io.emit('new_leave', socket.id);
            });
            socket.on('message', (message: string) => {
                this.io.emit('new_message', message, socket.id);
            });
        });
    }
}