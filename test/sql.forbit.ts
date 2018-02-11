import {SqlForbid} from '../source/sql.forbid';

console.log(SqlForbid('FROM xxx'));
console.log(SqlForbid('SELECT * FROM xxx'));
console.log(SqlForbid(' UPDATE xxx '));