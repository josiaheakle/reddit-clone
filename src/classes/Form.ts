import { ValidationError } from "express-validator";
import * as Express from "express";


interface InputProperty {

    id            : string, // HTML ID
    name          : string, // PROPERTY NAME
    type          : string, // HTML TYPE
    displayString : string,
    value         : string|number,
    errors?       : Array<string>

}

class Form {

    public inputs : Array<InputProperty>;

    constructor( inputs : Array<InputProperty> ) {
        this.inputs = inputs;
    }

    public updateValues (req : Express.Request) {

        console.log(`updating values`);
        console.log(req.body);

        this.inputs.forEach(i => {
            if (req.body[i.name]) {
                i.value = req.body[i.name];
            }
        });

        console.log(`UPDATED VALUES`);
        console.log(this.inputs);

    }

    public updateErrors (validationResult : ValidationError) {

        console.log(`validation errors`);
        console.log(validationResult);



    }

    public getRenderObject() {
        return false;
    }

}

export {
    InputProperty,
    Form
}