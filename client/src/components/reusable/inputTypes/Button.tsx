import * as React from 'react'
import InputProps from './InputProps';

interface ButtonProps extends InputProps {
    type?: "button" | "reset" | "submit" | undefined;
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
    return (
        <button className={`Button ${(props.isLoading?'isLoading':'')}`} id={props.id} type={props.type}>{props.label}</button>
    );
}