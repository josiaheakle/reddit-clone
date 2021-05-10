import * as Express from "express";

import { router as loginRouter } from "./auth/login";
import { router as registerRouter } from "./auth/register";
import { router as userRouter } from "./user/user"
import { router as categoryRouter } from "./category/category"

import { handleInfoMessages, isLoggedIn } from "../middleware"

export function initRoutes(app : Express.Application) {
    app.use('/', isLoggedIn, handleInfoMessages, (req : Express.Request, res : Express.Response, next : Function) => {
        next();
    });

    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/user', userRouter);
    app.use('/categories', categoryRouter);
}