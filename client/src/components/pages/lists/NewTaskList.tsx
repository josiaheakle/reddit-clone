import { Task } from '../../../types/schemas/Task';
import React from 'react'
import { TextInput } from "../../reusable/inputTypes/TextInput"
import { isPropertySignature } from 'typescript';
import { useEffect } from 'react';
import { useState } from 'react';

interface NewTaskListProps {
    update?: boolean;
    tasks: Array<Task>;
    editTask: (index: string|undefined) => void;
    updateTasks: (callback:(tasks:Array<Task>)=>void)=>void;
}

export const NewTaskList: React.FC<NewTaskListProps> = (props) => {

    const [tasks, setTasks] = useState<Array<Task>>();

    const editTask = (index: string|undefined) => {
        props.editTask(index);
    }

    useEffect(() => {
        console.log(`updated in ntl`)
    }, [tasks])

    useEffect(() => {
        props.updateTasks(setTasks);
    }, [])

    return (
        <div className='NewTaskList'>
            {tasks?.map((task) => {
                return (
                    <p className='new-task-shrunk-container' key={task.id}>
                        <span className='new-task-title new-task-text'>
                            {task.title}
                        </span>

                        <span className='new-task-text new-task-right'>
                            <span className="new-task-due-date">
                                {(task.dueDate) ? `${task.dueDate?.toDateString().split(' ')[1]} ${task.dueDate?.toDateString().split(' ')[2]}` : null}
                            </span>

                            <button onClick={() => { editTask(task.id) }} type='button' className='Button' id='new-task-button'><span className="material-icons">
                                edit
                            </span></button>
                        </span>

                    </p>
                );
            })}
        </div>
    );
}