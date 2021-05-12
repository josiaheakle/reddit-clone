import * as Express from "express";

import { AuthController } from "../classes/AuthController";

import { router as loginRouter } from "./auth/login";
import { router as registerRouter } from "./auth/register";
import { router as userRouter } from "./user/user"
import { router as categoryRouter } from "./category/category"

function getRouteString(route: string, apiUri? : string) {
    if(apiUri) {
        if (route === '/') return apiUri;
        else return `${apiUri}${route}`;
    } else return route;
}

export function initRoutes(app : Express.Application, apiUri? :string) {
    app.use(getRouteString('/', apiUri), AuthController.isLoggedIn, (req : Express.Request, res : Express.Response, next : Function) => {
        next();
    });

    app.use(getRouteString('/register', apiUri), registerRouter);
    app.use(getRouteString('/login', apiUri), loginRouter);
    app.use(getRouteString('/user', apiUri), userRouter);
    app.use(getRouteString('/categories', apiUri), categoryRouter);
}