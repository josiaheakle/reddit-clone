
import { MysqlError } from "mysql";
import {Database} from "./Database";

interface ModelProperties {
    name        : string,
    value?      : any,
    columnName? : string
}

// validate and sanitize before passing to model

class Model {

    private tableName  : string;
    private properties : Array<ModelProperties>;

    constructor(tableName : string, properties : Array<ModelProperties>) {
        this.tableName  = tableName;
        this.properties = properties;
    }

    async save() {
        let columns : Array<string> = [];
        let values  : Array<any>    = [];
        
        this.properties.forEach((prop) => {
            if(prop.columnName) {
                columns.push(prop.columnName);
                values.push(prop.value);
            }
        });
        
        let SQL = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (? ${", ?".repeat(values.length -1)})`;
        
        return new Promise((res, rej) => {
            Database.conn.query(SQL, values, (error : MysqlError, results : {[index:string]:any}) => {
                if(error) rej (error);
                res(results);
            })
        })

    }
    

}

export type {ModelProperties};
export {Model};