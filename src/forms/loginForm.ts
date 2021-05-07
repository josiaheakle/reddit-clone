import { Form } from "../classes/Form";
import { FormController } from "../classes/FormController";


const loginForm = new Form([{
    name: 'email',
    displayString: 'Email',
    id: 'email-input',
    type: 'email',
    required: true
},
{
    name: 'password',
    displayString: 'Password',
    id: 'password-input',
    type: 'password',
    required: true
}], '/login');

export {
    loginForm
}