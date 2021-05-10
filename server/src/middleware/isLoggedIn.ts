import * as Express from "express";
import { FormController } from "../classes"
import { loginForm } from "../forms"

function isLoggedIn(req : Express.Request, res : Express.Response, next : Function) {

    const nonSecurePaths = [
        '/login',
        '/register'
    ]

    const formController = new FormController(loginForm);

    if (req.session.user || nonSecurePaths.includes(req.path)) {
        return next();
    } else res.status(401).render('auth/login',
        {
            layout : 'nouser',
            formController : formController,
            mainColor : 'purple'
        }
    );

}

export { isLoggedIn };