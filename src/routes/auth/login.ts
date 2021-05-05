import * as Express from "express";
import { Form } from '../../classes/Form';
import { Model } from '../../classes/Model';
import { Database } from '../../classes/Database'
import { body, validationResult } from 'express-validator';


import { User } from "../../dataTypes/User"

const bcrypt = require('bcrypt');
const router = Express.Router();

class LoginModel extends Model {
    public async login() : Promise <User|boolean>
     {

        const SQL = `SELECT * FROM users WHERE email=? `;

        const emailProp = this.properties.find((prop) => prop.columnName === 'email');

        return new Promise((res, rej) => {
            Database.conn.query(SQL, [emailProp.value], (err, result) => {
                if (err) rej (err);
                if (result) {
                    const user = result[0];
                    console.log({userLogin : user});
                    if (!user) res (false);
                    else {
                        bcrypt.compare(this.properties.find(p => p.columnName==='password').value, user.password, (err, hashRes) => {
                            if (err || hashRes === false) res (false);
                            if (hashRes === true ) res (user);
                        });
                    }
                }
            });
        })

    }
}

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
        form : form
    });

});

router.post('/',
    body('email').isEmail().withMessage('Must be a valid email address.').normalizeEmail(),
    body('password').notEmpty().withMessage('Please enter password.'),
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

        const loginModel = new LoginModel('users', [
            {
                name : 'email',
                columnName : 'email'
            },
            {
                name : 'password',
                columnName : 'password'
            }
        ]);

        loginModel.loadBody(req);
        const user = await loginModel.login();
        if (user !== false) {
            req.session.user = user;
            req.session.messages = ['Successfully logged in.'];
            if (req.originalUrl === '/login') res.redirect('/');
            else next();
        } else {
            form.addError('email', 'Invalid email or password, please try again.');
            res.status(401).render('login',
                {
                    layout: 'nouser',
                    form : form
                }
            );
        }


});

export {router};