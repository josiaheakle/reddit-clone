import { Form } from "../classes";

const newCategoryForm = new Form([
    {
        displayString : 'Name',
        name : 'name',
        id : 'name-input',
        type : 'text',
        required : true
    }, 
    {
        displayString : 'Description',
        name : 'description',
        id : 'description-input',
        type : 'textarea',
        required : true
    },
    {
        onString : 'Private',
        offString : 'Public',
        name : 'private',
        id : 'private-input',
        type : 'switch'
    }
], '/categories/new')

export { newCategoryForm };