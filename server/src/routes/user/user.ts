import * as Express from "express";
import { UserModel } from "../../models";
const router = Express.Router();


router.get('/logout', (req : Express.Request, res : Express.Response, next: Function) => {

    req.session.destroy((err) => {
        if (err) console.error(err);
        else res.redirect('/');
    });

});

router.get('/delete', async (req : Express.Request, res : Express.Response, next: Function) => {

    const userModel = new UserModel();
    userModel.updateEmailFromSession(req.session);
    if (await userModel.deleteAccount()) {
        req.session.destroy((err) => {
            if (err) console.error(err);
            else res.redirect('/');
        });
    } else {
        req.session.messages.push('Unable to delete account at this time, please contact admin.');
    }


});

export {
    router
}