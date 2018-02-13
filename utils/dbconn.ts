import * as mysqldriver from 'mysql';

export const MysqlConn = (host: string, user: string, passwd: string, database: string, connLimit: number = 100) => {
    host = host.trim();
    let pos = host.lastIndexOf(':3306');
    if (pos >= 0) {
        host = host.substring(0, pos);
    }
    return mysqldriver.createPool({
        connectionLimit: connLimit,
        host: host,
        user: user,
        password: passwd,
        database: database,
    });
};