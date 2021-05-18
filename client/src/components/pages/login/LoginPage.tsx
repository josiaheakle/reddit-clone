// React
import * as React from 'react'
import { useState, useEffect } from 'react'

// Components
import { TextInput } from "../../reusable/inputTypes/TextInput"
import { Button } from "../../reusable/inputTypes/Button"
import { StandardResponse } from '../../../types/StandardResponse'

// Types
import { User } from "../../../types/schemas";
import { ChangeEvent } from "../../../types/EventTypes"

// Props
interface LoginPageProps {
    setUser : (user : User) => void;
    setToken : (token : string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = (props) => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    
    const [errors, setErrors] = useState<{[index:string]:Array<string>}>({});

    const updateInput : ChangeEvent<HTMLInputElement|HTMLTextAreaElement> = (e) =>  {
        switch(e.target.id.replace('-input', '')) {
            default:
            case('email'):
                setEmail(e.target.value);
                break;
            case('password'):
                setPassword(e.target.value);
                break;
        }
    }

    const login = async (e : React.FormEvent) : Promise<void> => {

        e.preventDefault();

        const res = await fetch(`${process.env.REACT_APP_URL}/login`, {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const response : StandardResponse = await res.json();
        if(response.errors) {
            setErrors(response.errors);
        } else if (response.success === true && response.data) {
            props.setToken(response.data.token);
            props.setUser(response.data.user);
        } 

    }

    return (
        <div className="form-card">
            <h2 className="form-header">Login</h2>
            <form onSubmit={login}>
                <TextInput id='email-input' label='Email' type='email' onChange={updateInput} errors={errors.email}></TextInput>
                <TextInput id='password-input' label='Password' type='password' onChange={updateInput} errors={errors.password}></TextInput>
                <Button id='login-submit-input' label='Login' />
            </form>
        <a className='bottom-link' href='/register'>Need an account?</a>
        </div>
    );
}