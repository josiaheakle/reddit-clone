import * as Express from "express";

const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
    res.render('login', {
        layout : "nouser"
    });
});

router.post('/', (req : Express.Request, res : Express.Response, next : Function) => {

    console.log(`got form submit`);
    console.log(req.body);

});

export {router};