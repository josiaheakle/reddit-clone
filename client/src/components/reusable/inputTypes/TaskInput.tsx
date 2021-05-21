import React from 'react'
import { ChangeEvent } from '../../../types/EventTypes';
import InputProps from './InputProps';
import { TextInput } from './TextInput';

interface TaskInputProps extends InputProps {
    onChange: ChangeEvent<HTMLInputElement>;
}

export const TaskInput: React.FC<TaskInputProps> = (props) => {
        return (
            <TextInput className='new-task' type="text" label={props.label} onChange={props.onChange} ></TextInput>
        );
}