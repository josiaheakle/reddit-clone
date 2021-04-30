import * as Express from "express";
import { router as loginRouter } from "./auth/login";

export function initRoutes(app : Express.Application) {
    app.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
        res.render('index');
    });

    app.use('/login', loginRouter);
}