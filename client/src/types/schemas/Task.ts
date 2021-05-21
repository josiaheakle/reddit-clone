interface Task {
    [key:string]: string|number|Date|undefined;

    title?: string;
    descr?: string;
    dueDate?: Date;
    id?: string;
    assigned?: string; // UUID of assigned user
}

export type {Task};
