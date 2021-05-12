import * as Express from "express";
import { body, validationResult } from "express-validator";
import { RegisterModel } from "../../models/RegisterModel";
import { InputController } from "../../classes";
import { StandardResponse } from "../../types/StandardResponse";
import { UserModel } from "../../models";
import * as JWT from 'jsonwebtoken';

const router = Express.Router();

router.get('/', (req: Express.Request, res: Express.Response, next: Function) => {

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


        
        const inController = new InputController([{
            name: 'email'
        }, {
            name: 'password'
        }, {
            name: 'firstName'
        }, {
            name: 'lastName'
        }, {
            name: 'passwordConfirm'
        }]);
        
        const valRes = validationResult(req);
        inController.updateValidationErrors(valRes);

        const model = new RegisterModel();
        model.loadBody(req);
        const modelErrors = await model.checkRules();
        if (modelErrors !== true) {
            inController.updateModelErrors(modelErrors);
        };

        if (inController.hasErrors()) {
            console.log(inController.inputs);
            inController.sendValidationErrors(req, res, next);
        } else {
            const user = await model.createAccount();
            if (user) {
                const token = JWT.sign({userId:user.id}, process.env.TOKEN_SECRET);
                const response : StandardResponse = {
                    success : true,
                    data: {
                        user: model.getCleanUser(user),
                        token: token
                    }
                }
                res.status(200).send(response);
            } else {
                res.status(401).send({
                    message: 'Unable to create account, please try again.'
                })
            }
        }


    }
);

export { router };