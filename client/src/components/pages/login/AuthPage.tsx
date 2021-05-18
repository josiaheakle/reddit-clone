import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';

import { LoginPage, RegisterPage} from "./";

import { User } from "../../../types/schemas";
import { useEffect } from 'react';

interface AuthPageProps {
    setUser: (user : User) => void;
    setToken: (token : string) => void;
    user?: User;
}

export const AuthPage: React.FC<AuthPageProps> = (props) => {

    const location = useLocation().pathname;

    if ((location !== '/login' && location !== '/register') && !props.user) {
        return (
            <Redirect to='/login'></Redirect>
        );
    } else {
        return (
            <div id='LoginPage'>
                    <Switch>
                        <Route path='/login'>
                            <LoginPage setUser={props.setUser} setToken={props.setToken} />
                        </Route>
                        <Route path='/register'>
                            <RegisterPage setUser={props.setUser} setToken={props.setToken}/>
                        </Route>
                    </Switch>
            </div>
        );
    }

}