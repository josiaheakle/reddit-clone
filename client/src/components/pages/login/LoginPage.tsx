

import * as React from 'react'
import { TextInput } from "../../reusable/inputTypes/TextInput"
import { Button } from "../../reusable/inputTypes/Button"
import { useState } from 'react'
import { updateInput as upIn } from '../../reusable/methods'
import { StandardResponse } from '../../../types/StandardResponse'


interface LoginPageProps {

}

export const LoginPage: React.FC<LoginPageProps> = (props) => {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [errors, setErrors] = useState<{[index:string]:Array<string>}>({});

    const updateInput = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>  {
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

        console.log(`${process.env.REACT_APP_URL}/login`);

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
        } else {
            
        }

    }

    return (
        <div id='LoginPage'>
            <div className="loginContainer">
                <h2 className="loginHeader header-text">Login</h2>
                <form onSubmit={login}>
                    <TextInput id='email-input' label='Email' type='email' onChange={updateInput} errors={errors.email}></TextInput>
                    <TextInput id='password-input' label='Password' type='password' onChange={updateInput} errors={errors.password}></TextInput>
                    <Button id='login-submit-input' label='Login' />
                </form>
            <a className='bottom-link' href='/register'>Need an account?</a>
            </div>
        </div>
    );
}