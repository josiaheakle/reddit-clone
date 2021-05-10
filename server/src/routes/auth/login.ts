import * as Express from "express";
import { body, validationResult } from 'express-validator';

import { LoginModel } from "../../models/LoginModel";

const router = Express.Router();




router.post('/',
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').notEmpty().withMessage('Please enter password.'),
    async (req: Express.Request, res: Express.Response, next: Function) => {




    });

export { router };