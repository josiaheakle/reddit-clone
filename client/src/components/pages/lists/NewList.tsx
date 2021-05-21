import React from 'react'
import { useState } from 'react';

import {TextInput, Button, TaskInput} from "../../reusable/inputTypes";
import { NewTask } from './NewTask';
import {ChangeEvent} from "../../../types/EventTypes"
import {Task} from "../../../types/schemas/Task"
import { NewTaskList } from './NewTaskList';
import { useEffect } from 'react';


interface NewListProps {

}

export const NewList: React.FC<NewListProps> = ({}) => {

    const [title, setTitle] = useState<string>();
    const [tasks, setTasks] = useState<Array<Task>>([{title:'title', dueDate:new Date(), descr:'fasd', id: '123123123'}]);
    const [editTask, setEditTask] = useState<Task|false>(false);
    const [updateListTasks, setUpdateListTasks] = useState<(tasks:Array<Task>)=>void>();

    const [errors, setErrors] = useState<{[index:string]:string[]|undefined}>({});

    

    const updateTask = (index: string|undefined) : void => {
        if(index) {
            setEditTask(false);
            const task = tasks.find((t) => t.id === index);
            setEditTask(task || false);
        }
    }

    const updateInput : ChangeEvent<HTMLInputElement> = (event) => {

    }

    const createList = async () => {
        
    }

    const removeTask = (index?: string) : void => {
        if (editTask) {
            const newTasks = tasks;
            newTasks.splice(tasks.findIndex((t)=>t.id===index),1);
            setEditTask(false);
            setTasks(newTasks);
        }
    }

    const addTask = (t: Task) : void =>  {
        if(!editTask){
            console.log(`adding new task`)
            console.table(t);
            const newTasks = tasks;
            newTasks.push(t);
            setTasks(newTasks)
        } else {
            console.log(`updating old task`)
            console.table(t);
            const newTasks = tasks;
            newTasks[tasks.findIndex((t)=>t.id===t.id)] = t;
            setTasks(newTasks);
        }
        console.table(tasks);
        setEditTask(false);
    }

    useEffect(()=>{
        if(updateListTasks) updateListTasks(tasks);
    },[tasks])


    return (
        <div className="form-card">
            <h2 className="form-header">New List</h2>
            <div onSubmit={createList}>
                <TextInput id='list-name-input' label='Title' type='text' onChange={updateInput} errors={errors.email}></TextInput>
                <NewTaskList updateTasks={(callback) => {  
                    setUpdateListTasks(callback);
                }} tasks={tasks} editTask={updateTask}></NewTaskList>
                <NewTask editing={editTask?true:false} task={editTask?editTask:undefined} onDelete={removeTask} onAdd={addTask}></NewTask>
                <Button id='list-submit-input' label='Create List' />
            </div>
        </div>
    );
}