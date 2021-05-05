
import { MysqlError } from "mysql";
import { Database } from "./Database";
import * as Express from "express";

const bcrypt = require('bcrypt');

interface ModelProprety {
    name        : string,
    value?      : any,
    columnName? : string,
    rules?      : Array<string | {[index:string]:string}>
}

interface RuleError {
    property : string,
    rule     : string,
    message  : string
}

// Be sure to validate and sanitize before sending to Model
class Model {

    private tableName  : string;
    private properties : Array<ModelProprety>;

    constructor(tableName : string, properties : Array<ModelProprety>) {
        this.tableName  = tableName;
        this.properties = properties;
    }


    public loadBody (request : Express.Request) {
        this.properties.forEach(prop => {
            if(request.body[prop.name]) {
                prop.value = request.body[prop.name];
            }
        });
    }

    public async checkRules () {
        const errors : Array<RuleError> = [];

        for (const prop of this.properties) {
            if (prop.rules) {
                for (const rule of prop.rules) {
                    if (typeof (rule) === 'string') {
                        // if rule is a string
                        if (! (await this[`_${rule}Rule`](prop))) errors.push({
                            property : prop.name,
                            rule     : rule,
                            message  : this._getErrorMessage(rule)
                        })
                    } else {
                        // if rule is an object
                        if (! (await this[`_${Object.keys(rule)[0]}Rule`](prop, Object.values(rule)[0]))) errors.push({
                            property : prop.name,
                            rule : Object.keys(rule)[0],
                            message : this._getErrorMessage(Object.keys(rule)[0])
                        });

                    }

                }
            }
        }

        return errors;
    }

    public async save() : Promise<string|number> {
        let columns : Array<string> = [];
        let values  : Array<any>    = [];
        
        this.properties.forEach((prop) => {
            if(prop.columnName) {
                columns.push(prop.columnName);
                values.push(prop.value);
            }
        });

        let SQL = `INSERT INTO ${this.tableName} (${columns.join(', ')}) VALUES (? ${", ?".repeat((values.length -1))})`;
    
        return new Promise((res, rej) => {
            Database.conn.query(SQL, values, (error : MysqlError, results : {[index:string]:any}) => {
                console.log(`RESULT`);
                console.log(results);
                if(error) rej (error);
                res(results.insertId);
            });
        });
    }

    public async load() : Promise<object> {

        const columns : Array<string> = [];
        const values : Array<string|number> = [];

        for (const prop of this.properties ) {
            if (prop.rules.includes('unique')) {
                columns.push(prop.columnName);
                values.push(prop.value);
            }
        }



        let whereClause = '';

        columns.forEach((col, i) => {
            if (i>0) whereClause = `${whereClause} AND `;
            whereClause = `${whereClause} ${col} = ? `
        });

        let SQL = `SELECT * FROM ${this.tableName} WHERE ${whereClause} `

/*
${ columns.reduce((acc, cur, i) => {
            if (i > 0) {
               return acc = `${acc} AND ${cur} = ?`
            } else return acc = `${cur}=?`;
        }) }
*/

        console.log(SQL);

        return {

        }

    }

    public async getById ( id : string|number ) {
        let SQL = `SELECT * FROM ${this.tableName} WHERE id=? `;
        return new Promise((res, rej) => {
            Database.conn.query(SQL, id, (error : MysqlError, results : {[index:string]:any}) => {
                console.log({
                    function : 'get by id',
                    SQL      : SQL,
                    error    : error,
                    results  : results
                })
                if(error) rej (false);
                else res(results[0]);
            });
        });

    }
    
    private async _uniqueRule ( property : ModelProprety ) {
        let SQL = `SELECT * FROM ${this.tableName} WHERE ${property.columnName}=? `;

        return new Promise((res, rej) => {
            Database.conn.query(SQL, property.value, (error : MysqlError, results : {[index:string]:any}) => {
                console.log({
                    function : '_unique',
                    SQL      : SQL,
                    error    : error,
                    results  : results
                })
                if(error) rej (false);
                if(results.length > 0) res(false);
                else res(true);
            });
        });
    }

    private async _passwordRule ( property : ModelProprety ) {
        return new Promise((res, rej) => {
            bcrypt.hash(property.value, 10, (err, hash) => {
                if (err) rej (false);
                else {
                    property.value = hash;
                    res(true);
                }
            });
        });
    }

    private _getErrorMessage ( rule : string ) {
        switch(rule) {
            case (`unique`):
                return `Already in use.`
                break;
        }
    }

}


export type {ModelProprety, RuleError};
export {Model};