import * as Express from "express";
import { UserModel } from "../../models";
const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next: Function) => {

    console.log(`user : ${req.session.user.firstName}|`)

    res.render('user', {
        rootUrl : process.env.URL,
        user: req.session.user,
        mainColor : 'purple'
    });

});

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
        res.render('user', {
            rootUrl : process.env.URL,
            user: req.session.user,
            mainColor : 'purple',
            infoMessages : req.session.messages
        });
    }


});

export {
    router
}