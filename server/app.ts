import * as express from 'express';
import {Routes} from './routes';

class App {
    public app: express.Application;
    public routes: Routes;

    constructor() {
        this.app = express();
        this.routes = new Routes();
        this.setRoutes();
    }

    private setRoutes(): void {
        this.routes.route(this.app);
    }
}

export const application = new App().app;