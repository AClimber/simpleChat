import {Request, Response} from "express";
import {generateUniqueUserName} from "../services/utils";

export class LoginController {
    public static onLogin(req: Request, res: Response) {
        const newUser: string = generateUniqueUserName();
        res.send(newUser);
    }
}