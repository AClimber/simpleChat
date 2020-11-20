import * as express from 'express';
import {LoginController} from '../controller/loginController';

export class Routes {
    public route(app: express.Application): void {
        app.use('/public/login', LoginController.onLogin);
        // app.use('/*', LoginController.onLogin);
    }
}