
import { User } from "../types/schemas";

class UserHandler {

    private user : User;

    constructor(user : User) {
        this.user = user;
    }

    public getEmail() {
        return this.user.email;
    }

    public getFirstName() {
        return this.user.firstName;
    }

    public getLastName() {
        return this.user.lastName;
    }

}

export {UserHandler};