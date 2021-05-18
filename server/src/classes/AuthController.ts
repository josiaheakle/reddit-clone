import * as Express from "express";
import { StandardResponse } from "../types/StandardResponse";
import * as JWT from 'jsonwebtoken';

class AuthController {

    static generateToken(userId : number|string, expiresIn?: number) {
        return JWT.sign({userId:userId}, process.env.TOKEN_SECRET, {
            expiresIn: expiresIn | 500
        })
    }

    static verifyToken(req : Express.Request, res : Express.Response, next : Function) {
        const token = req.headers['x-access-token'];
        let tokenRes;
        try {
            if (typeof(token) === 'string') tokenRes = JWT.verify(token, process.env.TOKEN_SECRET);
            if (tokenRes.userId) req.userId = tokenRes.userId;
        } catch (err) {
            
        }
        next();
    }

    static isLoggedIn(req : Express.Request, res : Express.Response, next : Function) {
        const nonSecurePaths = [
            '/login',
            '/register'
        ];
    
        if(nonSecurePaths.includes(req.path)) {
            return next();
        }

        AuthController.verifyToken(req, res, next);
    }

}

export { AuthController }