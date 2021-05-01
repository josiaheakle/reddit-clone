import * as Express from "express";
import { router as loginRouter } from "./auth/login";
import { router as registerRouter } from "./auth/register";

const bodyParser = require('body-parser');

export function initRoutes(app : Express.Application) {
    app.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
        res.render('index');
    });

    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
}