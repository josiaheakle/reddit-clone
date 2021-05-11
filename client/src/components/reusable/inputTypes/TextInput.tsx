import { on } from 'events';
import * as React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import InputProps from "./InputProps";

interface TextInputProps extends InputProps {
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void ;
    errors?: Array<string>;
}

export const TextInput: React.FC<TextInputProps> = (props) => {

    const [isFocued, setFocused] = useState<boolean>(false);
    const [input, setInput] = useState<string>();

    const onChange = (event : React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) : void => {
        setInput(event.target.value);
        props.onChange(event)
    }

    const onFocus = (event : React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) : void => {
        setFocused(true);
    }

    const onBlur = (event : React.FocusEvent) : void => {
        if(!input) {
            setFocused(false);
        }
    }

    useEffect(() => {
        console.log(props.errors)
    }, [props.errors])

    return (
        <div className="TextInputContainer">
            <span className={`TextInput ${props.errors?'invalid':null}`}>
                <label className={(isFocued?'focused':'')} htmlFor={props.id}>{props.label}</label>
                {(props.type === 'textarea') ?
                    <textarea id={props.id} onChange={onChange} onFocus={onFocus} onBlur={onBlur} ></textarea>
                    :
                    <input type={props.type} onChange={onChange} onFocus={onFocus} onBlur={onBlur} id={props.id}></input>
                }
            </span>
            {props.errors?
            <ul className='TextInput-error-list'>
                {props.errors.map((error) => {
                    return <li className='TextInput-error'>{error}</li>
                })}
            </ul>
            :null}
            
        </div>
    );
}