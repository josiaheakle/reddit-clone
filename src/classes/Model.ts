
import { MysqlError } from "mysql";
import { Database } from "./Database";
import * as Express from "express";

interface ModelProperties {
    name        : string,
    value?      : any,
    columnName? : string
}


// Be sure to validate and sanitize before sending to Model
class Model {

    private tableName  : string;
    private properties : Array<ModelProperties>;

    constructor(tableName : string, properties : Array<ModelProperties>) {
        this.tableName  = tableName;
        this.properties = properties;
    }


    loadBody (request : Express.Request) {
        this.properties.forEach(prop => {
            if(request.body[prop.name]) {
                prop.value = request.body[prop.name];
            }
        });
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
        
        console.log({
            columns : columns,
            values : values
        })

        let SQL = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (? ${", ?".repeat((values.length -1))})`;
        
        console.log({SQL : SQL})

        return new Promise((res, rej) => {
            Database.conn.query(SQL, values, (error : MysqlError, results : {[index:string]:any}) => {
                if(error) rej (error);
                res(results);
            });
        });

    }
    

}


export type {ModelProperties};
export {Model};