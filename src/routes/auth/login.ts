import * as Express from "express";

const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
    res.render('login', {
        layout : "nouser"
    });
});

router.post('/', (req : Express.Request, res : Express.Response, next : Function) => {

    console.log(req.body);
    console.log(`got form submit`);

});

export {router};