import * as Express from "express";
import { body, validationResult } from "express-validator";
import { Model } from "../../classes/Model";
import { Form } from "../../classes/Form";

const router = Express.Router();

const registerForm = new Form([
    {
        id: 'first-name-input',
        name: 'firstName',
        type: 'text',
        displayString: 'First Name'
    },
    {
        id: 'last-name-input',
        name: 'lastName',
        type: 'text',
        displayString: 'Last Name'
    },
    {
        id: 'email-input',
        name: 'email',
        type: 'text',
        displayString: 'Email'
    },
    {
        id : 'password-input',
        name: 'password',
        type: 'password',
        displayString : 'Password'
    },
    {
        id : 'password-confirm-input',
        name: 'passwordConfirm',
        type: 'password',
        displayString : 'Repeat Password'
    }
]);

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
    res.render('reg', {
        layout: 'nouser',
        inputProperties : registerForm.inputs

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

        const valErrors = validationResult(req);

        registerForm.updateValues(req);
        registerForm.updateErrors(valErrors['errors']);

        console.log({['registration inputs'] : registerForm.inputs})
        registerForm.inputs.forEach(i => {
            console.log(i.errors);
        });

        if(!valErrors.isEmpty()) {
            res.render('reg', {
                layout : 'nouser',
                inputProperties : registerForm.inputs
            });
        }

        // const registerModel = new Model('users', [{ name : 'firstName' }, {name:'lastName'}, {name: 'email'}, {name : "password"}]);
        // registerModel.loadBody(req);
        // registerModel.save();

        // res.writeHead(301,
        //     {Location: 'http://localhost:4000/'}
        // );
        // res.end();        

    }
);

export { router };