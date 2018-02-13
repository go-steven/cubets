import {Promise} from 'es6-promise'; // fixed issue： error TS2693: 'Promise' only refers to a type, but is being used as a value here.
import {mapSeries} from 'async';
import {DefaultConn} from "../utils/default.conn";
import {ReplaceAll} from '../utils/strings';
import {Mysql} from "../source/mysql";
import {QueryConn} from '../source/conn';
import {Row, Rows, SummaryRows, RowsFieldsMapping, RowFieldsMapping} from '../source/rows';
import {TplCfg} from "./tplcfg";
const util = require('util');

export const TPL_SEP: string = "@";
export const CUBE_THIS: string = "THIS";
export const CUBE_CUBE: string = "CUBE";
export const CUBE_SUMMARY: string = "SUMMARY";

export class Cube {
    private conn: QueryConn;
    private sql: string;
    private cubes: {[key:string]: Cube};
    private summary: {[key:string]: Cube};
    private retMapping: {[key: string]: string};

    constructor(conn: QueryConn) {
        this.conn = conn;
        this.cubes = {};
        this.summary = {};
        this.retMapping = {};

        this.Link(CubeTplVar(CUBE_THIS), this);
    }

    From = (c: Cube) : Cube => {
        let self = this;
        this.sql = c.ToSQL();
        return self;
    };

    FromTable = (table: string) : Cube => {
        let self = this;
        this.sql = util.format(`SELECT t.* FROM %s AS t`, table);
        return self;
    };

    SQL = (sql: string, ...a: any[]): Cube => {
        let self = this;
        if (a.length > 0) {
            sql = util.format(sql, ...a);
        }
        for (let tpl_var in self.cubes) {
            console.info("tpl_var: ", tpl_var);
            let c = self.cubes[tpl_var];
            sql = ReplaceAll(sql, tpl_var, util.format(`(%s)`, c.ToSQL()));
        }
        console.info("SQL(), sql: ", sql);
        self.sql = sql;
        return self;
    };

    Replace = (tplcfg: TplCfg): Cube => {
        let self = this;
        let sql = self.ToSQL();
        for (let k in tplcfg) {
            if (!tplcfg.hasOwnProperty(k)) {
                continue;
            }
            let tpl_var = CubeTplVar(k);
            if (tpl_var != "") {
                sql = ReplaceAll(sql, tpl_var, util.format(`%s`, tplcfg[k]));
            }
        }
        self.sql = sql;

        for (let name in self.summary) {
            let v = self.summary[name];
            let sql = v.ToSQL();
            for (let k in tplcfg) {
                if (!tplcfg.hasOwnProperty(k)) {
                    continue;
                }
                let tpl_var = CubeTplVar(k);
                if (tpl_var != "") {
                    sql = ReplaceAll(sql, tpl_var, util.format(`%s`, tplcfg[k]));
                }
            }
            v.SQL(sql);
        }
        return self;
    };

    SummarySQL = (name: string, sql: string, ...a: any[]): Cube => {
        let self = this;
        let summary = self.summary[name];
        if (!self.summary.hasOwnProperty(name)) {
            summary = new Cube(self.conn);
            self.summary[name] = summary;
            summary.Link(CubeTplVar(CUBE_CUBE), self);
        }
        summary.SQL(sql, ...a);
        summary.Link(CubeTplVar(CUBE_SUMMARY), summary);
        return self;
    };

    GroupSummary = (name: string, method: string, fields: string[]): Cube => {
        let self = this;
        name = name.trim();
        method = method.trim().toUpperCase();
        if (fields.length <= 0 || name === "" || method === "") {
            return self;
        }

        let sql = util.format(`SELECT
        `);

        for (let i = 0; i < fields.length;  i++) {
            let v = fields[i];
            sql += util.format(`%s(%s) AS %s`, method, v, v);
            if (i < fields.length - 1) {
                sql += `,`;
            }
            sql += `
            `
        }
        sql += `FROM @CUBE@ AS s`;
        return self.SummarySQL(name, sql);
    };

    ContrastSummary = (name: string, fields: string[]): Cube => {
        let self = this;
        name = name.trim();
        if (name === "" || fields.length <= 0) {
            return self;
        }

        let sql = `SELECT
        `;
        for (let i = 0; i < fields.length; i++) {
            let v = fields[i];
            sql += util.format(`IF(a.%s IS NULL OR a.%s=0, 0, ROUND((b.%s - a.%s) / a.%s, 4)) AS %s`, v, v, v, v, v, v);
            if (i < fields.length - 1) {
                sql += `,`;
            }
            sql += `
            `;
        }
        sql += `FROM (SELECT 1 AS ttt_id, t.* FROM @CUBE@ AS t LIMIT 0, 1) AS a
    INNER JOIN (SELECT 1 AS ttt_id, t.* FROM @CUBE@ AS t LIMIT 1, 1) AS b ON b.ttt_id = a.ttt_id`;
        return self.SummarySQL(name, sql);
    };

    RetMapping = (mapping: {[key:string]: string}): Cube => {
        let self = this;
        self.retMapping = mapping;
        for (let k in self.summary) {
            let v = self.summary[k];
            v.RetMapping(mapping);
        }
        return self;
    };

    Link = (alias: string, cube: Cube): Cube => {
        let self = this;

        alias = alias.trim().toUpperCase();
        self.cubes[alias] = cube;
        return self;
    };

    ToSQL = (): string => {
        return this.sql;
    };

    Rows = () => {
        let self = this;
        return new Promise((
            resolve: (data_rows: Rows) => void,
            reject: (err: any) => void
        ) => {
            let sql = self.ToSQL();
            if (sql.indexOf(TPL_SEP) >= 0) {
                console.error('Run SQL: %s.', sql);
                return reject(`SQL still has variables.`);
            }
            self.conn.query(sql).then((data_rows: Rows) =>{
                return resolve(RowsFieldsMapping(data_rows, self.retMapping));
            }).catch((err:any)=> {
                return reject(err);
            });
        });
    };

    Row = () => {
        let self = this;
        return new Promise((
            resolve: (data_row: Row) => void,
            reject: (err: any) => void
        ) => {
            let sql = self.ToSQL();
            if (sql.indexOf(TPL_SEP) >= 0) {
                console.error('Run SQL: %s.', sql);
                return reject(`SQL still has variables.`);
            }
            self.conn.queryFirst(sql).then((data_row: Row) =>{
                return resolve(RowFieldsMapping(data_row, self.retMapping));
            }).catch((err:any)=> {
                return reject(err);
            });
        });
    };

    Fields = () => {
        let self = this;
        return new Promise((
            resolve: (data_fields: string[]) => void,
            reject: (err: any) => void
        ) => {
            let sql = self.ToSQL();
            if (sql.indexOf(TPL_SEP) >= 0) {
                console.error('Run SQL: %s.', sql);
                return reject(`SQL still has variables.`);
            }
            self.conn.fields(sql).then((data_fields: string[]) =>{
                let ret: string[] = [];
                for (let k in data_fields) {
                    let v = data_fields[k];
                    let new_v = self.retMapping[v];
                    if (self.retMapping.hasOwnProperty(v)) {
                        ret.push(new_v);
                    } else {
                        ret.push(v);
                    }
                }
                return resolve(ret);
            }).catch((err:any)=> {
                return reject(err);
            });
        });
    };

    Summary = () => {
        let self = this;
        return new Promise((
            resolve: (data_rows: SummaryRows) => void,
            reject: (err: any) => void
        ) => {
            let ret: SummaryRows = {};

            // 同步一组操作
            mapSeries((():string[]=>{
                let keys: any = [];
                for (let k in self.summary) {
                    keys.push(k);
                }
                return keys;
            })(), (k: string, callback) => {
                self.summary[k].Row().then((data_row: Row) =>{
                    ret[k] = data_row;
                    return callback(undefined, k);
                }).catch((err:any)=> {
                    return callback(err, undefined);
                });
            }, (err, results: any) => { // 汇总操作结果
                if (err) {
                    return reject(err);
                }
                console.info("results: ", results);
                return resolve(ret);
            });
        });
    };
    /*
    Escape = (s: string): string => {
        return this.conn.escape(s);
    };
    */
    Copy = (): Cube => {
        let self = this;
        let cube = new Cube(self.conn);
        cube.sql = self.sql;
        cube.retMapping = self.retMapping;
        for (let k in self.cubes) {
            cube.cubes[k] = self.cubes[k];
        }
        for (let k in self.summary) {
            let v = self.summary[k];
            v.Link(CubeTplVar(CUBE_CUBE), cube);
            v.Link(CubeTplVar(CUBE_SUMMARY), v);
            cube.summary[k] = v;
        }

        return cube;
    };
}

export const CubeTplVar = (name: string): string => {
    name = name.trim().toUpperCase();
    return util.format(`%s%s%s`, TPL_SEP, name, TPL_SEP);
};

// new cube with default connection
export const ACube = (conn=DefaultConn): Cube => {
    return new Cube(new Mysql(conn));
};
