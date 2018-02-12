import * as mysqldriver from 'mysql';
import {Mysql} from '../source/mysql';
import {DefaultConn} from "../utils/dbconn";

const sql = 'SELECT 1 + 1 AS solution, 33 AS xx FROM dual';
let mysql = new Mysql(DefaultConn);
mysql.query(sql).then((rows: {[key: string]: any}[])=> {
    console.info('The result rows are: ', rows);
}).catch((err) => {
    console.error(err);
});

mysql.queryFirst(sql).then((row: {[key: string]: any})=> {
    console.info('The first row is: ', row);
}).catch((err) => {
    console.error(err);
});

mysql.fields(sql).then((fields: string[])=> {
    console.info('The result fields are: ', fields);
}).catch((err) => {
    console.error(err);
});

console.info('escape(user_id): ', mysql.escape('user_id'));
