import * as Express from "express";
import { body, validationResult } from "express-validator";

const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
    res.render('register', {
        layout: 'nouser'
    });
});

router.post('/', 
    body('firstName').isLength({min:2, max:30}).withMessage('Must be a valid name.').trim(),
    body('lastName').isLength({min:2, max:30}).withMessage('Must be a valid name.').trim(),
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').isStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    }).withMessage('Must be at least 6 characters with at least one lowercase letter, one uppercase letter, and one number.').trim(),
    body('passwordConfirm').custom((confirmPassword, {req}) => {
        if(req.body.password !== confirmPassword) throw new Error('Passwords must match.');
        else return true;
    }),
    (req : Express.Request, res : Express.Response, next : Function) => {

        const valErrors = validationResult(req);
        console.log(valErrors['errors']);
        if(!valErrors.isEmpty()) {
            res.render('register', {
                layout : 'nouser',
                validationErrors: valErrors['errors']
            });
        }

    }
);

export { router };