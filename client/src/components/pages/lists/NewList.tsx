import React from 'react'
import { useState } from 'react';

import {TextInput, Button, TaskInput} from "../../reusable/inputTypes";
import {ChangeEvent} from "../../../types/EventTypes"

interface NewListProps {

}

export const NewList: React.FC<NewListProps> = ({}) => {

    const [errors, setErrors] = useState<{[index:string]:string[]|undefined}>({});

    const updateInput : ChangeEvent<HTMLInputElement> = (event) => {

    }

    const createList = async () => {
        
    }

    return (
        <div className="form-card">
            <h2 className="form-header">New List</h2>
            <form onSubmit={createList}>
                <TextInput id='list-name-input' label='Title' type='text' onChange={updateInput} errors={errors.email}></TextInput>
                <TaskInput onChange={updateInput} label='task'></TaskInput>
                <Button id='list-submit-input' label='Create List' />
            </form>
        </div>
    );
}