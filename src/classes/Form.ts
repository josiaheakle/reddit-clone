import * as ExpressValidator from "express-validator";
import * as Express from "express";


interface InputProperty {

    id            : string,
    name          : string, 
    type          : string, 
    displayString : string,
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
                if(error['param'] === input.name && !input.errors.includes(error['msg'])) {
                    input.errors.push(error['msg']);
                }
            });
        });
        
    }

}

export {
    InputProperty,
    Form
}