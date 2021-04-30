import * as Mysql from "mysql";
require('dotenv').config();


const Database = (() => {

    const conn = Mysql.createConnection({
        host : process.env.DB_HOST,
        user : process.env.DB_USER,
        password : process.env.DB_PASS,
        database : process.env.DB_NAME
    });
    conn.connect();

    return {
        conn
    };

})();

export { Database };