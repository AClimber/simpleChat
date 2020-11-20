import * as http from 'http';
import * as path from 'path';

import * as dotenv from 'dotenv';
import {application} from './app';
import {SocketConnection} from './socket';
import {Server} from 'http';

const envPath = path.join(__dirname, '../.env');
dotenv.config({ path: envPath });
const {SERVER_PORT} = process.env;

const server: Server = http.createServer(application);
const socket: SocketConnection = new SocketConnection(server);

server.listen(SERVER_PORT, () => {
    console.log(`Server listening port: ${SERVER_PORT}`);
});