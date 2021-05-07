import * as Express from "express";
const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next: Function) => {

    res.render('user', {
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

router.get('/delete', (req : Express.Request, res : Express.Response, next: Function) => {

    req.session.destroy((err) => {
        if (err) console.error(err);
        else res.redirect('/');
    });

});

export {
    router
}