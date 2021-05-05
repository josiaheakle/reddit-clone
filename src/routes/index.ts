import * as Express from "express";
import { router as loginRouter } from "./auth/login";
import { router as registerRouter } from "./auth/register";

const bodyParser = require('body-parser');

export function initRoutes(app : Express.Application) {
    app.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
        if(req.session.user) {
            res.render('index');
        } else {
            res.writeHead(301,
                {Location: `http://localhost:4000/login`}
            );
            res.end(); 
        }
    });

    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
}