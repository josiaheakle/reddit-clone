
import { User } from "../types/schemas";

class UserHandler {

    private static token: string;

    static setToken(token: string) {
        UserHandler.token = token;
        UserHandler.saveTokenLocalStorage();
    }

    static removeToken() {
        UserHandler.token = '';
        UserHandler.removeTokenLocalStorage();
    }

    static removeTokenLocalStorage() {
        localStorage.removeItem(`token`);
    }

    static saveTokenLocalStorage() {
        localStorage.setItem(`token`, UserHandler.token);
    }

    static getTokenHeader() {
        return{
            'x-access-token': UserHandler.token
        }
    }

    static async checkForToken() : Promise<boolean> {
        const token = localStorage.getItem(`token`);
        if(token) {
            UserHandler.setToken(token);
            return true;
        } else return false;
    }

    static async getUserFromServer() : Promise<User|false> {
        const res = await fetch(`${process.env.REACT_APP_URL}/user`, {
            method: 'get',
            mode: 'cors',
            headers: UserHandler.getTokenHeader()
        });
        if (res.status === 200) {
            const response = await res.json();
            if (response.data.user) return response.data.user;
        } 
        return false;
    }

}

export {UserHandler};