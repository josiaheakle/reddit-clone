import { InputProperty } from "../classes/Form";

export const handlebarsHelpers = {

    propertyHasError : function ( property : InputProperty ) {
        if (!property.errors) return false;
        if (property.errors.length > 0) return true;
        return false;
    },
    getPropertyErrors : function (property : InputProperty ) {
        return property.errors;
    },

    hasError : function (errorArray : Array<{[index:string]:string}>, property : string) {
                    
        let hasError = false;
        if(errorArray) {
        errorArray.forEach((obj) => {
                if(obj['param'] === property) hasError = true;
            });
        }
        return hasError;
    },
    getErrorMessages : function (errorArray, property) {
        let errors = [];
        if(errorArray) {

        errorArray.forEach((obj) => {
            if(obj['param'] === property) errors.push(obj['msg']);
        });
    }
        return errors;
    },
    getLastValue : function (errorArray, property) {
        let val = '';
        if(errorArray) {

        errorArray.forEach((obj) => {
            if(obj['param'] === property) val = obj['value'];
        });
    }
        return val;
    }
}