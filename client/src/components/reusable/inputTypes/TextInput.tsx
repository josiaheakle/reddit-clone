import * as React from 'react'
import { useState, useEffect } from 'react';
import { ChangeEvent } from '../../../types/EventTypes';
import InputProps from "./InputProps";

interface TextInputProps extends React.HTMLAttributes<HTMLInputElement> {
    onChange?: ChangeEvent<HTMLInputElement> ;
    errors?: Array<string>;
    label?: string;
    [index:string]:any;    
}

export const TextInput: React.FC<TextInputProps> = (props) => {

    const [isFocued, setFocused] = useState<boolean>(false);
    const [input, setInput] = useState<string>();

    const inputRef : React.RefObject<HTMLInputElement> = React.createRef(); 

    const onChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        setInput(event.target.value);
        if(props.onChange)props.onChange(event)
    }

    const onFocus = (event : React.FocusEvent<HTMLInputElement>) : void => {
        setFocused(true);
    }

    const onBlur = (event : React.FocusEvent) : void => {
        if(!input) {
            setFocused(false);
        }
    }

    useEffect(() => {
        if(props.reset) {
            if(inputRef.current) inputRef.current.value='';
            setInput(undefined);
            setFocused(false);
        } 
        if (props.defaultValue) {
            setFocused(true);
        }
    }, [props])

    useEffect(() => {
        if(input && input.length>0) setFocused(true)
        else setFocused(false);
    }, [input])

    return (
        <div className={`TextInputContainer ${props.className?props.className:''}`}>
            <span className={`TextInput ${props.errors?'invalid':''}`}>
                <label className={(isFocued?'focused':'')} htmlFor={props.id}>{props.label}</label>
                <input ref={inputRef} {...props} onChange={onChange} onFocus={onFocus} onBlur={onBlur} ></input>
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