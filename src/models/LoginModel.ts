import { User } from "../schemas/User"
import { Database } from "../classes/Database";
import { UserModel } from "./UserModel";

class LoginModel extends UserModel {

    public async login() : Promise <User|boolean> {

        const user = await this.getUserByEmail();
        if (user && await this.verifyPassword(user)) return user;
        else return false;

    }
}

export {LoginModel}