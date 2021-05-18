// React
import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom";

// Input Types
import { TextInput } from "../../reusable/inputTypes/TextInput"
import { Button } from "../../reusable/inputTypes/Button"

// Data Types
import { User } from '../../../types/schemas'
import { StandardResponse } from '../../../types/StandardResponse'

// Props
interface RegisterPageProps {
    setUser : (user : User) => void;
    setToken : (token : string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = (props) => {

    const [email, setEmail] = useState<string>();
    const [firstName, setFirstName] = useState<string>();
    const [lastName, setLastName] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordConfirm, setPasswordConfirm] = useState<string>();

    const [errors, setErrors] = useState<{[index:string]:Array<string>}>({});

    /**
     * Updates input using dom id
     * @param e change event
     */
     const updateInput = (e : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>  {
        switch(e.target.id.replace('-input', '')) {
            default:
            case('lastName'):
                setLastName(e.target.value);
                break;
            case('firstName'):
                setFirstName(e.target.value);
                break;
            case('email'):
                setEmail(e.target.value);
                break;
            case('password'):
                setPassword(e.target.value);
                break;
            case('passwordConfirm'):
                setPasswordConfirm(e.target.value);
                break;
        }
    }

    /**
     * Sends new user data to server, 
     * if success user is set,
     * otherwise errors are set
     * @param e submit event
     */
    const register = async (e : React.FormEvent) : Promise<void> => {

        e.preventDefault();

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

    return (
        <div className="form-card">
            <h2 className="form-header">Register</h2>
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
    );
}