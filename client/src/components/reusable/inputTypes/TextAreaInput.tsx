import * as React from 'react'
import { useState } from 'react';
import { ChangeEvent } from '../../../types/EventTypes';
import InputProps from "./InputProps";

interface TextAreaInputProps extends InputProps {
    type: string;
    onChange: ChangeEvent<HTMLInputElement> ;
    errors?: Array<string>;
}

export const TextAreaInput: React.FC<TextAreaInputProps> = (props) => {

    const [isFocued, setFocused] = useState<boolean>(false);
    const [input, setInput] = useState<string>();

    const onChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        setInput(event.target.value);
        props.onChange(event)
    }

    const onFocus = (event : React.FocusEvent<HTMLInputElement>) : void => {
        setFocused(true);
    }

    const onBlur = (event : React.FocusEvent) : void => {
        if(!input) {
            setFocused(false);
        }
    }

    return (
        <div className="TextInputContainer">
            <span className={`TextInput ${props.errors?'invalid':null}`}>
                <label className={(isFocued?'focused':'')} htmlFor={props.id}>{props.label}</label>
                <input type={props.type} onChange={onChange} onFocus={onFocus} onBlur={onBlur} id={props.id}></input>
            </span>
            {props.errors?
            <ul className='TextInput-error-list'>
                {props.errors.map((error,i) => {
                    return <li key={i} className='TextInput-error'>{error}</li>
                })}
            </ul>
            :null}
            
        </div>
    );
}