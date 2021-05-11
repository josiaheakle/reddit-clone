import * as Express from "express";
import { body, validationResult } from 'express-validator';


import { InputController } from "../../classes/InputController";
import { LoginModel } from "../../models/LoginModel";

const router = Express.Router();




router.post('/',
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').isLength({
        max: 20,
        min: 6
    }).withMessage('Must be between 6 and 20 characters.'),
    async (req: Express.Request, res: Express.Response, next: Function) => {


        const valRes = validationResult(req);
        
        const inController = new InputController([{
            name: 'email'
        }, {
            name: 'password'
        }]);



        const model = new LoginModel();
        model.loadBody(req);
        const modelErrors = await model.checkRules();
        if (modelErrors !== true) inController.updateModelErrors(modelErrors);
        inController.updateValidationErrors(valRes);
        if (inController.hasErrors()) {
            inController.sendValidationErrors(req, res, next);
        } else {
            const user = await model.login();
            if (user) {
                req.session.user = user;
                res.status(200).send({
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uuid: user.uuid
                })
            } else {
                res.status(401).send({
                    email: 'Email or password are incorrect, please try again.'
                })
            }
        }


        // res.status(400).send({opp:"ppoop"});

    });

export { router };