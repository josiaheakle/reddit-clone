import React from 'react';
import {Redirect, Route} from "react-router-dom";

interface RestrictedRouteProps {

    authenticated: boolean;
    component: React.FC;
    [index: string]: any;

}

export const RestrictedRoute: React.FC<RestrictedRouteProps> = (props) => {
    return (
        <Route {...props} component={(p : {[index:string]:any})=>(props.authenticated?<props.component {...p}/>:<Redirect to='/login'></Redirect>)}/>
    );
}