export interface QueryConn {
    query(sql: string): any;
    queryFirst(sql: string): any;
    fields(sql: string): any;
    escape(s: string): string;
}