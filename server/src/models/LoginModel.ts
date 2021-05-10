import { User } from "../types/schemas"
import { UserModel } from "./UserModel";

class LoginModel extends UserModel {

    public async login() : Promise <User|boolean> {

        const user = await this.getUserByEmail();
        if (user && await this.verifyPassword(user)) return user;
        else return false;

    }
}

export {LoginModel}