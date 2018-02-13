import {Promise} from 'es6-promise'; // fixed issue： error TS2693: 'Promise' only refers to a type, but is being used as a value here.
import {SqlForbid} from './sql.forbid';
import {QueryConn} from './conn';
import {Row, Rows} from './rows';

class Mysql implements QueryConn {
    private conn: any;

    constructor(conn: any) {
        this.conn = conn;
    }

    //  执行SQL，并返回记录列表
    query = (sql: string) => {
        let self = this;
        return new Promise((
            resolve: (data_rows: Rows) => void,
            reject: (err: any) => void
        ) => {
            if (SqlForbid(sql)) {
                console.error('MYSQL run SQL: %s.', sql);
                return reject('ERROR: has not-allowed keywords in SQL.');
            }

            self.conn.getConnection((e:any, connection:any) => {
                if (e) {
                    console.error('MYSQL run SQL: %s.', sql);
                    return reject(e);
                }

                connection.query(sql, (db_err:any, db_results:any, db_fields:any) => {
                    connection.release();

                    if (db_err) {
                        console.error('MYSQL run SQL: %s.', sql);
                        return reject(db_err);
                    }
                    if (db_results.length <= 0) {
                        return resolve([]);
                    }

                    const retFields: string[] = trimDbFields(db_fields);
                    if (retFields.length <= 0) {
                        console.error('MYSQL run SQL: %s.', sql);
                        return reject('ERROR: no return fields given.');
                    }

                    let rows: Rows = [];
                    for (let i in db_results) {
                        if (!db_results.hasOwnProperty(i)) {
                            continue;
                        }
                        let row: Row = {};
                        for (let j in retFields) {
                            row[retFields[j]] = db_results[i][retFields[j]];
                        }
                        rows.push(row)
                    }
                    return resolve(rows)
                });
            });
        });
    };

    //  执行SQL，并返回首条记录
    queryFirst = (sql: string) => {
        let self = this;
        return new Promise((
            resolve: (data_rows: Row) => void,
            reject: (err: any) => void
        ) => {
            if (SqlForbid(sql)) {
                console.error('MYSQL run SQL: %s.', sql);
                return reject('ERROR: has not-allowed keywords in SQL.');
            }

            self.conn.getConnection((e:any, connection:any) => {
                if (e) {
                    console.error('MYSQL run SQL: %s.', sql);
                    return reject(e);
                }

                connection.query(sql, (db_err:any, db_results:any, db_fields:any) => {
                    connection.release();

                    if (db_err) {
                        console.error('MYSQL run SQL: %s.', sql);
                        return reject(db_err);
                    }
                    if (db_results.length <= 0) {
                        return resolve({});
                    }

                    const retFields: string[] = trimDbFields(db_fields);
                    if (retFields.length <= 0) {
                        console.error('MYSQL run SQL: %s.', sql);
                        return reject('ERROR: no return fields given.');
                    }

                    let row: Row = {};
                    for (let j in retFields) {
                        row[retFields[j]] = db_results[0][retFields[j]];
                    }
                    return resolve(row);
                });
            });
        });
    };

    //  执行SQL，并返回记录字段列表
    fields = (sql: string) => {
        let self = this;
        return new Promise((
            resolve: (data_fields: string[]) => void,
            reject: (err: any) => void
        ) => {
            if (SqlForbid(sql)) {
                console.error('MYSQL run SQL: %s.', sql);
                return reject('ERROR: has not-allowed keywords in SQL.');
            }

            self.conn.getConnection((e:any, connection:any) => {
                if (e) {
                    console.error('MYSQL run SQL: %s.', sql);
                    return reject(e);
                }

                connection.query(sql, (db_err:any, db_results:any, db_fields:any) => {
                    connection.release();

                    if (db_err) {
                        console.error('MYSQL run SQL: %s.', sql);
                        return reject(db_err);
                    }
                    if (db_results.length <= 0) {
                        return resolve([]);
                    }
                    return resolve(trimDbFields(db_fields));
                });
            });
        });
    };

    escape = (s: string): string => {
        return this.conn.escape(s);
    };
}

const trimDbFields = (db_fields: any): string[] => {
    let fields: string[] = [];
    for (let j in db_fields) {
        if (!db_fields.hasOwnProperty(j)) {
            continue;
        }
        let v: string = db_fields[j].name.trim();
        if (v.length >= 2 && v[0] == '`' && v[v.length-1] == '`') {
            v = v.substr(1, v.length-2)
        }
        if (v != '') {
            fields.push(v);
        }
    }
    return fields;
};

export {Mysql};