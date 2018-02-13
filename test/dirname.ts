import * as path from 'path';

let curr_path = path.resolve();
console.log("curr_path: ", curr_path);
let dirname = curr_path + `/../example/report/daily/A/`;

console.log(dirname.lastIndexOf('/'));