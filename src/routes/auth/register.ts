import * as Express from "express";
import { body, validationResult } from "express-validator";
import { Model } from "../../classes/Model";
import { Form } from "../../classes/Form";

const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
    const registerForm = new Form([
        {
            id: 'first-name-input',
            name: 'firstName',
            type: 'text',
            displayString: 'First Name',
            required: true
        },
        {
            id: 'last-name-input',
            name: 'lastName',
            type: 'text',
            displayString: 'Last Name',
            required: true
    
        },
        {
            id: 'email-input',
            name: 'email',
            type: 'email',
            displayString: 'Email',
            required: true
    
        },
        {
            id : 'password-input',
            name: 'password',
            type: 'password',
            displayString : 'Password',
            required: true
    
        },
        {
            id : 'password-confirm-input',
            name: 'passwordConfirm',
            type: 'password',
            displayString : 'Repeat Password',
            required: true
    
        }
    ]);
    

    res.render('reg', {
        layout: 'nouser',
        form : registerForm

    });
});

router.post('/', 
    body('firstName').matches(/^[a-zA-Z ]*$/).withMessage('Must be a valid name.').isLength({min:2, max:30}).withMessage('Must be between 2 and 30 characters.').trim(),
    body('lastName').matches(/^[a-zA-Z ]*$/).withMessage('Must be a valid name.').isLength({min:2, max:30}).withMessage('Must be between 2 and 30 characters.').trim(),
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').isLength({
        min: 6
    }).withMessage('Must be at least 6 characters.').trim(),
    body('passwordConfirm').custom((confirmPassword, {req}) => {
        if(req.body.password !== confirmPassword) throw new Error('Passwords must match.');
        else return true;
    }),
    async (req : Express.Request, res : Express.Response, next : Function) => {

        const registerForm = new Form([
            {
                id: 'first-name-input',
                name: 'firstName',
                type: 'text',
                displayString: 'First Name',
                required: true
            },
            {
                id: 'last-name-input',
                name: 'lastName',
                type: 'text',
                displayString: 'Last Name',
                required: true
        
            },
            {
                id: 'email-input',
                name: 'email',
                type: 'email',
                displayString: 'Email',
                required: true
        
            },
            {
                id : 'password-input',
                name: 'password',
                type: 'password',
                displayString : 'Password',
                required: true
        
            },
            {
                id : 'password-confirm-input',
                name: 'passwordConfirm',
                type: 'password',
                displayString : 'Repeat Password',
                required: true
        
            }
        ]);
        

        const valErrors = validationResult(req);

        registerForm.updateValues(req);
        registerForm.updateErrors(valErrors['errors']);

        const registerModel = new Model('users', [{ name : 'firstName', columnName : 'firstName' }, {name:'lastName' , columnName : 'lastName'}, {name: 'email', columnName : 'email', rules : ['unique']}, {name : "password", columnName : 'password', rules : ['password']}]);
        registerModel.loadBody(req);
        const modelErrors = await registerModel.checkRules();
        if (modelErrors.length > 0) registerForm.addModelErrors(modelErrors);

        if(registerForm.hasError()) {
            res.render('reg', {
                layout : 'nouser',
                form : registerForm
            });
        } else {

            const userId = await registerModel.save();
            const user = await registerModel.getById(userId);

            req.session.user = user;

            res.redirect('/');

        }


    }
);

export { router };