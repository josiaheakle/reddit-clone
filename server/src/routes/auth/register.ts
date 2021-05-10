import * as Express from "express";
import { body, validationResult } from "express-validator";
import { FormController } from "../../classes/FormController";
import { Model } from "../../classes/Model";
import { registerForm } from "../../forms/registerForm"
import { RegisterModel } from "../../models/RegisterModel";

const router = Express.Router();

router.get('/', (req: Express.Request, res: Express.Response, next: Function) => {

    const formController = new FormController(registerForm);

    res.render('auth/reg', {
        rootUrl: process.env.URL,

        layout: 'nouser',
        formController: formController,
        mainColor: 'purple'

    });
});

router.post('/',
    body('firstName').matches(/^[a-zA-Z ]*$/).withMessage('Must be a valid name.').isLength({ min: 2, max: 30 }).withMessage('Must be between 2 and 30 characters.').trim(),
    body('lastName').matches(/^[a-zA-Z ]*$/).withMessage('Must be a valid name.').isLength({ min: 2, max: 30 }).withMessage('Must be between 2 and 30 characters.').trim(),
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').isLength({
        min: 6
    }).withMessage('Must be at least 6 characters.').trim(),
    body('passwordConfirm').custom((confirmPassword, { req }) => {
        if (req.body.password !== confirmPassword) throw new Error('Passwords must match.');
        else return true;
    }),
    async (req: Express.Request, res: Express.Response, next: Function) => {

        const formController = new FormController(registerForm);

        const valErrors = validationResult(req);

        formController.updateValues(req);
        formController.updateValidationErrors(valErrors['errors']);

        const registerModel = new RegisterModel();
        registerModel.loadBody(req);
        const modelErrors = await registerModel.checkRules();
        if (modelErrors !== true) formController.updateModelErrors(modelErrors);

        if (formController.hasError()) {
            res.render('auth/reg', {
                rootUrl: process.env.URL,

                layout: 'nouser',
                formController: formController,
                mainColor: 'purple'
            });
        } else {

            const user = await registerModel.createAccount();
            if (user) {
                req.session.messages.push(`Welcome, ${user.firstName}. Your account has been created successfully.`)
                req.session.user = user;
                res.redirect('/');
            } else {
                formController.addError('email', 'Unable to create account.');
                res.render('auth/reg', {
                    rootUrl: process.env.URL,
                    layout: 'nouser',
                    formController: formController,
                    mainColor: 'purple'
                });
            }

        }


    }
);

export { router };