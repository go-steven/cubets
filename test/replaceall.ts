import {ReplaceAll} from '../utils/strings';
const util = require('util');

let sql = `SELECT t.* FROM @THIS@ AS t WHERE t.id=10`;
let s = `SELECT * FROM skyline.clients`;
let ret = ReplaceAll(sql, "@THIS@", util.format(`(%s)`, s));
console.log("ret: ", ret);

let ret2 = sql.replace(/@THIS@/igm, util.format(`(%s)`, s));
console.log("ret2: ", ret2);