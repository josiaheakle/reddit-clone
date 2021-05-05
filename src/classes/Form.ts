import * as ExpressValidator from "express-validator";
import * as Express from "express";
import { RuleError } from "./Model";

interface InputProperty {

    id            : string,
    name          : string, 
    type          : string, 
    displayString : string,
    required?     : boolean,
    value?        : string|number,
    errors?       : Array<string>

}

class Form {

    public inputs : Array<InputProperty>;

    constructor( inputs : Array<InputProperty> ) {
        this.inputs = inputs;
        this.setInitValues();
    }

    private setInitValues () {
        this.inputs.forEach(i => {
            if (!i.value) i.value = '';
            if (!i.errors) i.errors = [];
            if (!i.required) i.required = false;
        });
    }

    public updateValues (req : Express.Request) {

        this.inputs.forEach(i => {
            if (req.body[i.name]) {
                i.value = req.body[i.name];
            }
        });

    }

    public updateErrors (errors : Array<ExpressValidator.ValidationError>) {
        
        errors.forEach(error => {
            this.inputs.forEach(input => {
                input.errors = [];
                if(error['param'] === input.name && !input.errors.includes(error['msg'])) {
                    input.errors.push(error['msg']);
                }
            });
        });
    }

    public addModelErrors ( modelErrors : Array<RuleError> ) {
        modelErrors.forEach(error => {
            this.inputs.forEach(input => {
                if (input.name === error.property && !input.errors.includes(error.message)) input.errors.push(error.message);
            })
        });
    }

    public addError (propertyName : string, error : string) {
        this.inputs.forEach(input => {
            if (input.name === propertyName) input.errors.push(error);
        });
    }

    public hasError () {
        return this.inputs.some(i => {
            if (i.errors.length > 0) return true;
        });
    }

}

export {
    InputProperty,
    Form
}