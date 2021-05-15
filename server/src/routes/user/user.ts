import * as Express from "express";
import { UserModel } from "../../models";
import { AuthController } from "../../classes/AuthController";
import { StandardResponse } from "../../types/StandardResponse";
import {User} from "../../types/schemas";

const router = Express.Router();




router.get('/', async (req : Express.Request, res : Express.Response, next : Function) => {

    const userModel = new UserModel();
    let user: User|false = false;
    if (req.userId) {
        user = await userModel.getById<User>(req.userId);
    }

    if (user !== false) {
        const response : StandardResponse = {
            success: true,
            data: {
                user: userModel.getCleanUser(user)
            }
        }
        res.status(200).send(response);
    } else {
        res.status(400).send({
            success: false,
            message: 'Login'
        })
    }


});

router.post('/logout', (req : Express.Request, res : Express.Response, next: Function) => {

    req.session.destroy((err) => {
        if (err) console.error(err);
        else res.redirect('/');
    });

});

router.post('/delete', async (req : Express.Request, res : Express.Response, next: Function) => {

    const userModel = new UserModel();
    userModel.updateEmailFromSession(req.session);
    if (await userModel.deleteAccount()) {
        req.session.destroy((err) => {
            if (err) console.error(err);
            else res.redirect('/');
        });
    } else {
        // req.session.messages.push('Unable to delete account at this time, please contact admin.');
    }


});

export {
    router
}