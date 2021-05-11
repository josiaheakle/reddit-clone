
import * as Validator from 'express-validator';
import * as Express from 'express';
import { StandardResponse } from '../types/StandardResponse';
import { RuleError} from "../classes";

interface InputError {
    name: string;
    errors?: Array<string>;
}

class InputController {

    public inputs : Array<InputError>;

    constructor(inputs : Array<InputError>) {
        this.inputs = inputs;
        inputs.forEach(i => i.errors = []);
    }

    public updateValidationErrors (validationResult : Validator.Result) {
        const errors = validationResult.array();
        errors.forEach((error) => {
            this.inputs.forEach((input) => {
                if (input.name === error.param && !input.errors.includes(error.msg)) {
                    input.errors.push(error.msg);
                } 
            });
        });
    }

    public updateModelErrors ( modelErrors : Array<RuleError> ) {
        
        modelErrors.forEach(error => {
            this.inputs.forEach(input => {
                if (input.name === error.property && !input.errors.includes(error.message)) { 
                    input.errors.push(error.message);
                }
            })
        });
    }


    /**
     * Sends input errors as json response.
     * @param req 
     * @param res 
     * @param next 
     */
    public sendValidationErrors (req : Express.Request, res : Express.Response, next : Function) {
        


        const errorObj : {[index:string]:Array<string>} = {};

        this.inputs.forEach((input) => {
            errorObj[input.name] = input.errors;
        })

        const response : StandardResponse = {
            success: false,
            errors: errorObj
        }

        res.status(401).send(response);

    }

    public hasErrors() : boolean {
        let hasError = false;
        this.inputs.forEach(i => {
            if (i.errors.length > 0) { 
                hasError = true;
            }
        });
        return hasError;
    }

}

export {InputController};
export type {InputError};