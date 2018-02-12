const util = require('util');

const forbid_keywords_cfgs: {[key: string]: string[]} = {
    'no-space': [
        ';',
    ],
    'has_spaces': [
        'ALTER',
        'AUTOCOMMIT',
        'BEGIN',
        'CALL',
        'COMMIT',
        'CREATE',
        'DELETE',
        'DENY',
        'DO',
        'DROP',
        'END',
        'EXPLAIN',
        'FLUSH',
        'FUNCTION',
        'GRANT',
        'HANDLER',
        'INDEX',
        'INSERT',
        'INTO',
        'LOAD',
        'LOCK',
        'PROCEDURE',
        'READ',
        'RENAME',
        'REPLACE',
        'REVOKE',
        'ROLLBACK',
        'SAVEPOINT',
        'SET',
        'SHOW',
        'START',
        'TABLE',
        'TABLES',
        'TRANSACTION',
        'TRUNCATE',
        'UNLOCK',
        'UPDATE',
        'VALUES',
        'VIEW',
        'WITH',
    ],
};

const generate_sql_forbid_regexp = (forbid_keywords: {[key: string]: string[]}) : string =>{
    let s: string = `.*`;
    for (let keywords_type in forbid_keywords) {
        let keywords = forbid_keywords[keywords_type];
        for (let k = 0; k < keywords.length; k++) {
            if (k > 0) {
                s += `|`;
            }
            let v = keywords[k].trim().toUpperCase();
            switch (keywords_type) {
                case 'no-space':
                    s += v;
                    break;
                case 'has_spaces':
                    s += util.format(`\\s%s\\s`, v);
                    break;
            }
        }
    }
    s += `.*`;

    //console.info("regexp: %s", s);
    return s
};

const sql_forbid_regexp = new RegExp(generate_sql_forbid_regexp(forbid_keywords_cfgs), "igm");

const SqlForbid = (sql: string): boolean => {
    sql = sql.trim().toUpperCase();
    if (sql.length <= 0) {
        return false;
    }
    if (sql.indexOf("SELECT") != 0) {
        console.error('SQL should begin with SELECT.');
        return true;
    }
    if (sql_forbid_regexp.test(sql)) {
        console.error('SQL has not-allowed keywords.');
        return true;
    }
    return false;
};

export {SqlForbid};