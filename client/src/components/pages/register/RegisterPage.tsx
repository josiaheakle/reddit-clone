import * as React from 'react'
import { TextInput } from "../../reusable/inputTypes/TextInput"
import { Button } from "../../reusable/inputTypes/Button"
import { useState } from 'react'
import { User } from '../../../types/schemas'
import { useEffect } from 'react'
import { StandardResponse } from '../../../types/StandardResponse'
import {Redirect } from "react-router-dom";

interface RegisterPageProps {
    setUser : (user : User) => void;
    setToken : (token : string) => void;
    user?: User;
}

export const RegisterPage: React.FC<RegisterPageProps> = (props) => {

    const [email, setEmail] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfirm, setPasswordConfirm] = useState<string>();
    const [errors, setErrors] = useState<{[index:string]:Array<string>}>({});

    const updateInput = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>  {
        const inputName = e.target.id.replace('-input', '');
        eval(`set${inputName.charAt(0).toUpperCase()}${inputName.slice(1)}('${e.target.value}')`);
    }

    const register = async (e : React.FormEvent) : Promise<void> => {

        e.preventDefault();

        console.log(`${process.env.REACT_APP_URL}/login`);

        const res = await fetch(`${process.env.REACT_APP_URL}/register`, {
            method: 'post',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
                passwordConfirm: passwordConfirm
            })
        });

        const result : StandardResponse = await res.json();
        if(result.errors) setErrors(result.errors);
        if(result.success===true && result.data) {
            props.setUser(result.data.user);
            props.setToken(result.data.token);
        }

    }

    useEffect(() => {
        console.log(`e: ${email}\nfn: ${firstName}\nln: ${lastName}\npw: ${password}\npwc: ${passwordConfirm}`);
    },[email, firstName, lastName, passwordConfirm, password]);

    return (
        <div id='LoginPage'>
            {props.user?
                <Redirect to='/'></Redirect>
            :null}
            <div className="loginContainer">
                <h2 className="loginHeader header-text">Register</h2>
                <form onSubmit={register}>
                    <TextInput id='email-input' label='Email' type='email' onChange={updateInput} errors={errors.email} ></TextInput>
                    <TextInput id='firstName-input' label='First Name' type='text' onChange={updateInput} errors={errors.firstName}></TextInput>
                    <TextInput id='lastName-input' label='Last Name' type='text' onChange={updateInput} errors={errors.lastName}></TextInput>
                    <TextInput id='password-input' label='Password' type='password' onChange={updateInput} errors={errors.password}></TextInput>
                    <TextInput id='passwordConfirm-input' label='Password Repeat' type='password' onChange={updateInput} errors={errors.passwordConfirm}></TextInput>
                    <Button id='login-submit-input' label='Create Account' />
                </form>
            <a className='bottom-link' href='/login'>Already have an account?</a>
            </div>
        </div>
    );
}