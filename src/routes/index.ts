import * as Express from "express";

import { router as loginRouter } from "./auth/login";
import { router as registerRouter } from "./auth/register";
import { router as userRouter } from "./user"

import { handleInfoMessages, isLoggedIn } from "../middleware"
import { handlebarsHelpers } from "../helpers/handlebarsHelpers";

export function initRoutes(app : Express.Application) {
    app.use('/', isLoggedIn, handleInfoMessages, (req : Express.Request, res : Express.Response, next : Function) => {
        next();
    });

    app.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
        res.render('index', {
            mainColor : 'purple',
            infoMessages : req.session.messages
        });
    });

    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/user', userRouter);
}