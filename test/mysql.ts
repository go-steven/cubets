import * as mysqldriver from 'mysql';
import {Mysql} from '../source/mysql';

let conn  = mysqldriver.createPool({
    connectionLimit : 10,
    host     : 'conn0845t2j7.mysql.rds.aliyuncs.com',
    user     : 'usr0845t2j7',
    password : 'd1gthsskd0345cricsuki',
    database: 'xibao_v2',
});

const sql = 'SELECT 1 + 1 AS solution, 33 AS xx FROM dual';
let mysql = new Mysql(conn)
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
