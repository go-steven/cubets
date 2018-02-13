import * as mysqldriver from 'mysql';
import * as fs from 'fs';
import * as ini from 'ini';
import {DefaultDbCfg} from "../utils/dbcfg";

let config = DefaultDbCfg();
var DefaultConn  = mysqldriver.createPool({
    connectionLimit : 10,
    host     : config["host"],
    user     : config["user"],
    password : config["passwd"],
    database : config["dbname"],
});
export {DefaultConn};