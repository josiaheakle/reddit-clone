import * as Express from "express";

export function initRoutes(app : Express.Application) {
    app.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
        res.render('index');
    });
}