import * as Express from "express";
import { body, validationResult } from "express-validator";
import { Model } from "../../classes/Model";

const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
    res.render('register', {
        layout: 'nouser'
    });
});

router.post('/', 
    body('firstName').isLength({min:2, max:30}).withMessage('Must be between 2 and 30 characters.').trim(),
    body('lastName').isLength({min:2, max:30}).withMessage('Must be between 2 and 30 characters.').trim(),
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').isLength({
        min: 6
    }).withMessage('Must be at least 6 characters.').trim(),
    body('passwordConfirm').custom((confirmPassword, {req}) => {
        if(req.body.password !== confirmPassword) throw new Error('Passwords must match.');
        else return true;
    }),
    (req : Express.Request, res : Express.Response, next : Function) => {

        const inputValues = {
            firstName : req.body.firstName ?? '', 
            lastName : req.body.lastName ?? '',
            email :  req.body.email ?? '',
            password : req.body.password ?? ''
        }

        const valErrors = validationResult(req);
        console.log({errors : valErrors['errors']});
        if(!valErrors.isEmpty()) {
            res.render('register', {
                layout : 'nouser',
                validationErrors: valErrors['errors'],
                values : inputValues
            });
        }

        const registerModel = new Model('users', [{ name : 'firstName' }, {name:'lastName'}, {name: 'email'}, {name : "password"}]);
        registerModel.loadBody(req);
        registerModel.save();

        res.writeHead(301,
            {Location: 'http://localhost:4000/'}
        );
        res.end();        

    }
);

export { router };