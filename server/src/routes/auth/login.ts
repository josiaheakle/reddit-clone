import * as Express from "express";
import { body, validationResult } from 'express-validator';
import { FormController } from "../../classes/FormController";

import { loginForm as form } from "../../forms/loginForm";
import { LoginModel } from "../../models/LoginModel";

const router = Express.Router();



router.get('/', (req: Express.Request, res: Express.Response, next: Function) => {

    const formController = new FormController(form);
    res.render('auth/login', {
        rootUrl : process.env.URL,

        layout: "nouser",
        formController: formController,
        mainColor: 'purple'

    });

});

router.post('/',
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').notEmpty().withMessage('Please enter password.'),
    async (req: Express.Request, res: Express.Response, next: Function) => {

        const formController = new FormController(form);

        const valErrors = validationResult(req);
        formController.updateValidationErrors(valErrors['errors']);
        formController.updateValues(req);

        const loginModel = new LoginModel();
        loginModel.loadBody(req);
        const user = await loginModel.login();

        if (user !== false) {
            req.session.user = user;
            req.session.messages = ['Successfully logged in.'];

            console.log(`url : ${req.originalUrl}`)

            if (req.originalUrl === '/login') res.redirect('/');
            else res.redirect(req.originalUrl);
        } else {
            formController.addError('email', 'Invalid email or password, please try again.');

            res.status(401).render('auth/login',
                {
                    layout: 'nouser',
                    formController: formController,
                    mainColor: 'purple'

                }
            );
        }


    });

export { router };