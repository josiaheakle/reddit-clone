import { Model, ModelProprety } from "../classes/Model";
import { User } from "../schemas/User";

const bcrypt = require('bcrypt');

class RegisterModel extends Model {

    public _tableName = 'Users';
    public property_email : ModelProprety = {
        columnName : 'email',
        rules: ['unique']
    };
    public property_firstName : ModelProprety = {
        columnName : 'firstName'
    };
    public property_lastName : ModelProprety = {
        columnName : 'lastName'
    };
    public property_password : ModelProprety = {
        columnName : 'password'
    };
    public property_passwordConfirm : ModelProprety;

    public async createAccount() : Promise <User|false> {

        if(await this._hashPassword()) {
            const userId = await this.save();
            if (userId !== false) {
                    const userObj = await this.getById(userId);
                    if (userObj) {
                        return {
                            id : userObj.id,
                            uuid : userObj.uuid,
                            firstName : userObj.firstName,
                            lastName : userObj.lastName,
                            password : userObj.password,
                            email : userObj.email,
                            created : userObj.created
                        }
                    } else return false;
    
            } else return false;
        }

    }

    private async _hashPassword () {

        return new Promise((res, rej) => {
            bcrypt.hash(this.property_password.value, 10, (err, hash) => {
                if (err) res (false);
                else {
                    this.property_password.value = hash;
                    res(true);
                }
            });
        });

    }
}

export {RegisterModel}