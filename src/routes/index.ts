import * as Express from "express";
import { Form } from "../classes/Form";

import { router as loginRouter } from "./auth/login";
import { router as registerRouter } from "./auth/register";
import { router as userRouter } from "./user"

function isLoggedIn(req : Express.Request, res : Express.Response, next : Function) {

    const nonSecurePaths = [
        '/login',
        '/register'
    ]

    console.log({ 
        PATH        : req.path,
        SESSION     : req.session,
        SESSIONID   : req.sessionID,
        USER        : req.session.user
    });

    const form = new Form([{
        name: 'email',
        displayString: 'Email',
        id: 'email-input',
        type: 'email',
        required: true
    },
    {
        name: 'password',
        displayString: 'Password',
        id: 'password-input',
        type: 'password',
        required: true

    }], '/login')

    if (req.session.user || nonSecurePaths.includes(req.path)) {
        return next();
    } else res.status(401).render('login',
        {
            layout : 'nouser',
            form : form
        }
    );

}

export function initRoutes(app : Express.Application) {
    app.use('/', isLoggedIn, (req : Express.Request, res : Express.Response, next : Function) => {



        next();

    });

    app.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
        res.render('index');
    });

    app.use('/register', registerRouter);
    app.use('/login', loginRouter);
    app.use('/user', userRouter);
}