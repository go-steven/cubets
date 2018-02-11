export type Row = {[key: string]: any};
export type Rows = Row[];
export type SummaryRows = {[key: string]: Row};

export const RowFieldsMapping = (row: Row, mapping: Row): Row => {
    let newRow: Row = {};
    for (let k in row) {
        let newK = mapping[k];
        if (!mapping.hasOwnProperty(k)) {
            newK = k;
        }
        newRow[newK] = row[k];
    }
    return newRow;
};

export const RowsFieldsMapping = (rows: Rows, mapping: Row): Rows => {
    let newRows: Rows = [];
    for (let k in rows) {
        newRows.push(RowFieldsMapping(rows[k], mapping));
    }
    return newRows;
};
