import * as Express from "express";
import { FormController } from "../classes"
function isLoggedIn(req : Express.Request, res : Express.Response, next : Function) {

    const nonSecurePaths = [
        '/login',
        '/register'
    ]

    if (req.session.user || nonSecurePaths.includes(req.path)) {
        return next();
    }

}

export { isLoggedIn };