import { Model, ModelProprety } from "../classes/Model";
import { User } from "../schemas/User"
import { Database } from "../classes/Database";

const bcrypt = require('bcrypt');

class LoginModel extends Model {

    public _tableName = 'users';
    public property_email : ModelProprety = {
        columnName : 'email'
    };
    public property_password : ModelProprety = {
        columnName : 'password'
    }

    public async login() : Promise <User|boolean> {

        console.log(this)

        const SQL = `SELECT * FROM users WHERE email=? `;

        return new Promise((res, rej) => {
            Database.conn.query(SQL, [this.property_email.value], (err, result) => {
                if (err) rej (err);
                if (result) {
                    console.log({result:result});
                    const user = result[0];
                    console.log({userLogin : user});
                    if (!user) res (false);
                    else {
                        bcrypt.compare(this.property_password.value, user.password, (err, hashRes) => {
                            if (err || hashRes === false) res (false);
                            if (hashRes === true ) res (user);
                        });
                    }
                }
            });
        })

    }
}

export {LoginModel}