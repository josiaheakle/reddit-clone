import { Form } from "../classes/Form";

const registerForm = new Form([
    {
        id: 'first-name-input',
        name: 'firstName',
        type: 'text',
        displayString: 'First Name',
        required: true
    },
    {
        id: 'last-name-input',
        name: 'lastName',
        type: 'text',
        displayString: 'Last Name',
        required: true

    },
    {
        id: 'email-input',
        name: 'email',
        type: 'email',
        displayString: 'Email',
        required: true

    },
    {
        id : 'password-input',
        name: 'password',
        type: 'password',
        displayString : 'Password',
        required: true

    },
    {
        id : 'password-confirm-input',
        name: 'passwordConfirm',
        type: 'password',
        displayString : 'Repeat Password',
        required: true

    }
], '/register');

export { registerForm };