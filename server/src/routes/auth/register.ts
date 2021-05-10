import * as Express from "express";
import { body, validationResult } from "express-validator";
import { Model } from "../../classes/Model";
import { RegisterModel } from "../../models/RegisterModel";

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


        const valErrors = validationResult(req);


        const registerModel = new RegisterModel();
        registerModel.loadBody(req);
        const modelErrors = await registerModel.checkRules();


    }
);

export { router };