import { MysqlError } from "mysql";
import {Model, ModelProprety} from "../classes"
import { Database } from "../classes";
import { User } from "../schemas/User";

const bcrypt = require('bcrypt');

class UserModel extends Model {
    public _tableName = 'Users';
 
    public property_email : ModelProprety = {
        columnName : 'email'
    };
    public property_password : ModelProprety = {
        columnName : 'password'
    };

    public async getUserByEmail () : Promise<User|false> {
        
        const SQL = `SELECT * FROM ${this._tableName} WHERE email=? `;
        return new Promise((res, rej) => {
            Database.conn.query(SQL, [this.property_email.value], async (err, result) => {
                if (err) rej (err);
                if (result) {
                    console.log ({
                        emailres : result
                    })
                    const user = result[0];
                    if (!user) res (false);
                    else res (user);
                }
            });
        });

    }

    public async verifyPassword (user : {[index:string]:any}) : Promise<boolean> {
        return new Promise((res, rej) => {
            bcrypt.compare(this.property_password.value, user.password, (err, hashRes) => {
                if (err || hashRes === false) res (false);
                if (hashRes === true ) res (true);
            });
        });
    }

    public async deleteAccount () : Promise<boolean> {

        const user = await this.getUserByEmail();
        if (user) {
            
            const SQL = `DELETE FROM ${this._tableName} WHERE ${this.property_email.columnName}=?`;
            return new Promise((res, rej) => {
                Database.conn.query(SQL, [this.property_email.value], (err : MysqlError, results : any) => {
                    if (err || !(results.affectedRows>0) ) res (false);
                    res(true);
                });
            });

        } else {
            return false;
        }

    }

    public updateEmailFromSession ( session : Express.Session ) {
        if (session.user) {
            this.property_email.value = session.user.email;
        }
    }

}

export {
    UserModel
}