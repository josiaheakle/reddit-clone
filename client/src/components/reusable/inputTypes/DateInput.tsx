import * as React from 'react'
import { useState, useEffect } from 'react';
import { ChangeEvent } from '../../../types/EventTypes';

interface DateInputProps extends React.HTMLAttributes<HTMLInputElement> {
    errors?: Array<string>;
    defaultValue?: string;
    onChange: ChangeEvent<HTMLInputElement>;
    reset?:boolean;
    [index:string]:any;
}

export const DateInput: React.FC<DateInputProps> = (props) => {

    const [isFocued, setFocused] = useState<boolean>(false);
    const [input, setInput] = useState<string>();

    const inputRef : React.RefObject<HTMLInputElement> = React.createRef();

    const onChange = (event : React.ChangeEvent<HTMLInputElement>) : void => {
        setInput(event.target.value);
        props.onChange(event);
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
            setInput(props.defaultValue);
            setFocused(true);
        }
    }, [props])

    useEffect(() => {
        if(input && input.length>0) setFocused(true)
        else setFocused(false);
        if(input===undefined) setFocused(false);
    }, [input])

    return (
        <div className="TextInputContainer Date">
            <span className={`TextInput ${props.errors?'invalid':null}`}>
                <label className={(isFocued?'focused':'')} htmlFor={props.id}>{props.label}</label>
                <input ref={inputRef} {...props} className={` ${(!isFocued) ? 'empty' : null}`} type='date' onChange={onChange} onFocus={onFocus} onBlur={onBlur}  ></input>
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