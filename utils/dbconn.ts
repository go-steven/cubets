import * as mysqldriver from 'mysql';

var DefaultConn  = mysqldriver.createPool({
    connectionLimit : 10,
    host     : 'conn0845t2j7.mysql.rds.aliyuncs.com',
    user     : 'usr0845t2j7',
    password : 'd1gthsskd0345cricsuki',
    database: 'xibao_v2',
});

export {DefaultConn};