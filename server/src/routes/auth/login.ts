import * as Express from "express";
import { body, validationResult } from 'express-validator';

import { AuthController } from "../../classes";
import { InputController } from "../../classes";
import { LoginModel } from "../../models/LoginModel";
import { StandardResponse } from "../../types/StandardResponse";

const router = Express.Router();

router.post('/',
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').isLength({
        max: 20,
        min: 6
    }).withMessage('Must be between 6 and 20 characters.'),
    async (req: Express.Request, res: Express.Response, next: Function) => {

        const inController = new InputController([{
            name: 'email'
        }, {
            name: 'password'
        }]);
        
        const model = new LoginModel();
        model.loadBody(req);
        
        
        // Get errors from validation and model
        const valRes = validationResult(req);
        const modelErrors = await model.checkRules();
        if (modelErrors !== true) inController.updateModelErrors(modelErrors);
        inController.updateValidationErrors(valRes);

        // If errors, send to client
        if (inController.hasErrors()) {
            inController.sendValidationErrors(req, res, next);
        } else {
            // Login user
            const user = await model.login();
            if (user) {  
                // generate token and send user
                const token = AuthController.generateToken(user.id, 3000);
                const response : StandardResponse = {
                    success: true,
                    data: {
                        token: token,
                        user: model.getCleanUser(user)
                    }
                }
                res.status(200).send(response)
            } else {
                res.status(401).send({
                    email: 'Email or password are incorrect, please try again.'
                })
            }
        }

    });

export { router };