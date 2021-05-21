import React, { RefObject, MouseEventHandler } from 'react';
import { useState } from 'react';
import { ChangeEvent } from '../../../types/EventTypes';
import {TextInput, TextAreaInput, DateInput} from "../../reusable/inputTypes";
import {Task} from "../../../types/schemas/Task"
import { useEffect } from 'react';
import { v4 } from "uuid";

interface NewTaskProps {
    task?: Task;
    editing?: boolean;
    onDelete: ()=>void;
    onAdd: (t:Task)=>void;
}

const getDate = (date?: Date) => {
    if(!date) return undefined;
    const year = date.getFullYear();
    const day = (date.getDay() < 10? `0${date.getDay()}` : date.getDay());
    const month = (date.getMonth() < 10? `0${date.getMonth()}` : date.getMonth())
    return `${year}-${month}-${day}`
}


export const NewTask: React.FC<NewTaskProps> = (props) => {

    const [title, setTitle] = useState<string>();
    const [descr, setDescr] = useState<string>();
    const [date, setDate] = useState<string>();

    const [reset, setReset] = useState<boolean>(false);

    const formRef : RefObject<HTMLFormElement> = React.createRef();

    const updateInput : ChangeEvent<HTMLInputElement|HTMLTextAreaElement> = (e) => {
        switch(e.target.id.replace('new-task-', '').replace('-input', '')) {
            case('title'):
                setTitle(e.target.value);
                break;
            case('descr'):
                setDescr(e.target.value);
                break;
            case('date'):
                setDate(e.target.value);
                break;
        }
    }

    const taskHasProperty = (property: string) : boolean => {
        if(!props.task) {

            return false;
        }
        if(props.task[property]) {
            return true;
        }
        else {

            return false;
        }
    }

    const deleteTask : MouseEventHandler<HTMLButtonElement> = () => {

        props.onDelete();
        setReset(true);

    }

    const addTask : MouseEventHandler<HTMLButtonElement> = () => {

        const task = {
            id: v4(),
            title: title,
            descr: descr,
            dueDate: (date?new Date(date):undefined)
        }

        props.onAdd(task);       
        setReset(true);
    }

    useEffect(() => {
        setTitle(props.task?.title)
        setDescr(props.task?.descr)
        setDate(getDate(props.task?.dueDate));
    }, [props.task])  

    useEffect(() => {
        formRef.current?.reset();
        setTitle(undefined);
        setDescr(undefined);
        setDate(undefined);
        if(reset){
            setReset(false);
        }
    }, [reset])

    return (
        <form ref={formRef} className="new-task-container">
            <span className='date-input-container'>
                <TextInput className={'Left'} reset={reset} id='new-task-title-input' label='Task' type='text' onChange={updateInput} defaultValue={taskHasProperty('title')?props.task?.title:undefined}></TextInput>
                <button onClick={deleteTask} type='reset' className='Button' id='new-task-button'><span className="material-icons">
                    delete
                </span></button>
            </span>
            <TextAreaInput reset={reset} id='new-task-descr-input' label='Description' onChange={updateInput} defaultValue={taskHasProperty('descr')?props.task?.descr:undefined}></TextAreaInput>
            <span  className="date-input-container">
                <DateInput reset={reset} id='new-task-date-input' label='Due Date' onChange={updateInput} defaultValue={taskHasProperty('dueDate')?`${getDate(props.task?.dueDate)}`:undefined}></DateInput>
                <button onClick={addTask} type='reset' className='Button' id='new-task-button'><span className="material-icons">
                    {(props.editing)?'check':'add'}
                </span></button>
            </span>
        </form>
    );
}