import * as Express from "express";
import { body, validationResult } from "express-validator";
import { FormController } from "../../classes";

import { CategoryModel } from "../../models";

const router = Express.Router();


/**
 * categories/ => SHOWS ALL FOLLOWING CATEGORIES
 *  new/   => CREATE A NEW CATEGORY
 *  {any}/ => CATEGORY PAGE ( shows all posts for said category )
 */




router.post(
    '/new',
    body('name').notEmpty().isAlpha().trim(),
    body('description').isLength({
        max: 255,
        min: 10
    }).withMessage('Must be between 10 and 255 characters').trim(),
    async (req : Express.Request, res : Express.Response, next : Function) => {

        const valErrors = validationResult(req);



    

    }
);

export {
    router
}