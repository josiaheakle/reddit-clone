import * as Express from "express";
import { Form } from '../../classes/Form';
import { Model } from '../../classes/Model';
import { body, validationResult } from 'express-validator';

const router = Express.Router();

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {

    const form = new Form([{
        name: 'email',
        displayString: 'Email',
        id: 'email-input',
        type: 'email',
        required: true
    },
    {
        name: 'password',
        displayString: 'Password',
        id: 'password-input',
        type: 'password',
        required: true

    }])

    res.render('login', {
        layout : "nouser",
        inputProperties : form.inputs
    });

});

router.post('/',
    body('email').isEmpty().normalizeEmail(),
    body('password').notEmpty(),
    async (req : Express.Request, res : Express.Response, next : Function) => {

        const form = new Form([{
            name: 'email',
            displayString: 'Email',
            id: 'email-input',
            type: 'email',
            required: true
        },
        {
            name: 'password',
            displayString: 'Password',
            id: 'password-input',
            type: 'password',
            required: true

        }])

        const valErrors = validationResult(req);
        form.updateErrors(valErrors['errors']);
        form.updateValues(req);

        const loginModel = new Model('users', [
            {
                name : 'email',
                columnName : 'email',
                rules : ['unique']
            },
            {
                name : 'password',
                columnName : 'password',
                rules : [{'passwordVerify' : 'password'}]
            }
        ]);

        loginModel.loadBody(req);
        await loginModel.load();

        console.log(`got form submit`);
        console.log(req.body);

});

export {router};