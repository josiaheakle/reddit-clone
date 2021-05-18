
import { useEffect, useState } from "react";
import { User } from "../types/schemas";

class TokenHandler {

    private static token: string;

    static setToken(token: string) {
        TokenHandler.token = token;
        TokenHandler.saveTokenLocalStorage();
    }

    static removeToken() {
        TokenHandler.token = '';
        TokenHandler.removeTokenLocalStorage();
    }

    static removeTokenLocalStorage() {
        localStorage.removeItem(`token`);
    }

    static saveTokenLocalStorage() {
        localStorage.setItem(`token`, TokenHandler.token);
    }

    static getTokenHeader() {
        return{
            'x-access-token': TokenHandler.token
        }
    }

    static async checkForToken() : Promise<boolean> {
        const token = localStorage.getItem(`token`);
        if(token) {
            TokenHandler.setToken(token);
            return true;
        } else return false;
    }

    static async getUserFromServer() : Promise<User|false> {
        const res = await fetch(`${process.env.REACT_APP_URL}/user`, {
            method: 'get',
            mode: 'cors',
            headers: TokenHandler.getTokenHeader()
        });
        if (res.status === 200) {
            const response = await res.json();
            if (response.data.user) return response.data.user;
        } 
        return false;
    }

}


/**
 * Gets user from server if token is set, 
 * is false otherwise
 */
const useUserToken = () : [User | undefined, React.Dispatch<React.SetStateAction<User | undefined>>] => {

    const [ user, setUser ] = useState<User|undefined>(undefined);

    useEffect(() => {
        (async() => {
            if (await TokenHandler.checkForToken()) {
                let user = await TokenHandler.getUserFromServer();
                if (user) {
                    setUser(user);
                }
            }    
        })();
    }, []);

    return [user,setUser];

}

export {TokenHandler, useUserToken};