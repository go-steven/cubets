declare module 'cubets/utils/inifile' {
	export const LoadIniCfgs: (iniFile: string, section: string, separator?: string) => {
	    [key: string]: string;
	};

}
declare module 'cubets/utils/dbconn' {
	export const MysqlConn: (host: string, user: string, passwd: string, database: string, connLimit?: number) => any;

}
declare module 'cubets/utils/default.conn' {
	 var DefaultConn: any;
	export { DefaultConn };

}
declare module 'cubets/utils/strings' {
	export const ReplaceAll: (s: string, old: string, newVal: string) => string;

}
declare module 'cubets/source/sql.forbid' {
	 const SqlForbid: (sql: string) => boolean;
	export { SqlForbid };

}
declare module 'cubets/source/conn' {
	export interface QueryConn {
	    query(sql: string): any;
	    queryFirst(sql: string): any;
	    fields(sql: string): any;
	    escape(s: string): string;
	}

}
declare module 'cubets/source/rows' {
	export type Row = {
	    [key: string]: any;
	};
	export type Rows = Row[];
	export type SummaryRows = {
	    [key: string]: Row;
	};
	export const RowFieldsMapping: (row: Row, mapping: Row) => Row;
	export const RowsFieldsMapping: (rows: Row[], mapping: Row) => Row[];

}
declare module 'cubets/source/mysql' {
	import { QueryConn } from 'cubets/source/conn'; class Mysql implements QueryConn {
	    private conn;
	    constructor(conn: any);
	    query: (sql: string) => any;
	    queryFirst: (sql: string) => any;
	    fields: (sql: string) => any;
	    escape: (s: string) => string;
	}
	export { Mysql };

}
declare module 'cubets/cube/tplcfg' {
	import { Row } from 'cubets/source/rows';
	export type TplCfg = Row;
	export const ReadTplCfgFile: (tplCfgFile: string) => Row;

}
declare module 'cubets/cube/cube' {
	import { QueryConn } from 'cubets/source/conn';
	import { Row } from 'cubets/source/rows';
	export const TPL_SEP: string;
	export const CUBE_THIS: string;
	export const CUBE_CUBE: string;
	export const CUBE_SUMMARY: string;
	export class Cube {
	    private conn;
	    private sql;
	    private cubes;
	    private summary;
	    private retMapping;
	    constructor(conn: QueryConn);
	    From: (c: Cube) => Cube;
	    FromTable: (table: string) => Cube;
	    SQL: (sql: string, ...a: any[]) => Cube;
	    Replace: (tplcfg: Row) => Cube;
	    SummarySQL: (name: string, sql: string, ...a: any[]) => Cube;
	    GroupSummary: (name: string, method: string, fields: string[]) => Cube;
	    ContrastSummary: (name: string, fields: string[]) => Cube;
	    RetMapping: (mapping: {
	        [key: string]: string;
	    }) => Cube;
	    Link: (alias: string, cube: Cube) => Cube;
	    ToSQL: () => string;
	    Rows: () => any;
	    Row: () => any;
	    Fields: () => any;
	    Summary: () => any;
	    Copy: () => Cube;
	}
	export const CubeTplVar: (name: string) => string;
	export const ACube: (conn?: any) => Cube;

}
declare module 'cubets/engine/reports' {
	import { Rows, SummaryRows } from 'cubets/source/rows';
	import { Cube } from 'cubets/cube/cube'; class ReportRet {
	    Name: string;
	    Fields: string[];
	    Data: Rows;
	    Summary: SummaryRows;
	} type ReportRets = {
	    [key: string]: ReportRet;
	}; class Reports {
	    private data;
	    constructor();
	    AddCube: (name: string, c: Cube) => Reports;
	    Cubes: () => {
	        [key: string]: Cube;
	    };
	    Run: (tplcfgs?: {
	        [key: string]: any;
	    }) => any;
	    RunAndSave: (tplConfigFile: string, outputFile: string) => any;
	}
	export { Reports, ReportRet, ReportRets };

}
declare module 'cubets/engine/run' {
	import { Reports } from 'cubets/engine/reports';
	import { Cube } from 'cubets/cube/cube';
	export const RunCube: (f: () => Cube, name?: string) => void;
	export const RunReports: (f: () => Reports, tplcfg?: {
	    [key: string]: any;
	}) => void;

}
declare module 'cubets/example/cube-exec-sql/index' {
	export {};

}
declare module 'cubets/example/cube-from-cube/index' {
	export {};

}
declare module 'cubets/example/cube-from-sql/index' {
	export {};

}
declare module 'cubets/example/cube-from-table/index' {
	export {};

}
declare module 'cubets/example/cube-join/index' {
	export {};

}
declare module 'cubets/example/cube-union/index' {
	export {};

}
declare module 'cubets/example/dimension/index' {
	export {};

}
declare module 'cubets/example/groupby/index' {
	export {};

}
declare module 'cubets/example/mapping/index' {
	export {};

}
declare module 'cubets/example/mysql-join/index' {
	export {};

}
declare module 'cubets/example/mysql-union/index' {
	export {};

}
declare module 'cubets/example/select/index' {
	export {};

}
declare module 'cubets/example/sql/index' {
	export {};

}
declare module 'cubets/example/summary/index' {
	export {};

}
declare module 'cubets/test/async_map' {
	export {};

}
declare module 'cubets/test/cube' {
	export {};

}
declare module 'cubets/test/cube2' {
	export {};

}
declare module 'cubets/test/dirname' {
	export {};

}
declare module 'cubets/utils/dirzip' {
	export const DirZip: (dir: string, addMain?: boolean) => string;
	export const DirUnzip: (zip: string, dirname: string, addMain?: boolean) => any;

}
declare module 'cubets/test/dirzip' {
	export {};

}
declare module 'cubets/test/ini.file' {
	export {};

}
declare module 'cubets/test/mysql' {
	export {};

}
declare module 'cubets/test/replaceall' {
	export {};

}
declare module 'cubets/test/sql.forbit' {
	export {};

}
