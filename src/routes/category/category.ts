import * as Express from "express";
import { body, validationResult } from "express-validator";
import { FormController } from "../../classes";

import { newCategoryForm } from "../../forms"
import { CategoryModel } from "../../models";

const router = Express.Router();


/**
 * c/ => SHOWS ALL FOLLOWING CATEGORIES
 *  new/   => CREATE A NEW CATEGORY
 *  {any}/ => CATEGORY PAGE ( shows all posts for said category )
 */

router.get('/', (req : Express.Request, res : Express.Response, next : Function) => {
    

    res.render('categories/allCategories', {
        rootUrl : process.env.URL,

        mainColor : 'purple',
    })

});

router.get('/new', (req : Express.Request, res : Express.Response, next : Function) => {

    const formController = new FormController(newCategoryForm);
    res.render('categories/newCategory', {
        rootUrl : process.env.URL,

        mainColor : 'purple',
        formController : formController
    })

});

router.post(
    '/new',
    body('name').notEmpty().isAlpha().trim(),
    body('description').isLength({
        max: 255,
        min: 10
    }).withMessage('Must be between 10 and 255 characters').trim(),
    async (req : Express.Request, res : Express.Response, next : Function) => {

        const valErrors = validationResult(req);

        const formController = new FormController(newCategoryForm);
        formController.updateValidationErrors(valErrors['errors']);
        formController.updateValues(req);

        const categoryModel = new CategoryModel();
        categoryModel.loadBody(req);
        
        const modelErrors = await categoryModel.checkRules();
        if (modelErrors !== true) formController.updateModelErrors(modelErrors);

        if (formController.hasError()) {
            res.render('categories/newCategory', {
                rootUrl: process.env.URL,
                formController: formController,
                mainColor: 'purple'
            });
        } else {

            const category = await categoryModel.createCategory(req.session.user.id);
            console.log ({
                newCategory : category
            });

            if (category) {
                res.redirect(`/categories/${category.name}`)
            }

        }

    }
);

export {
    router
}