import {DirZip, DirUnzip} from "../utils/dirzip";

import * as path from 'path';

let curr_path = path.resolve();
console.log("curr_path: ", curr_path);
let dirname = curr_path + `/../example/report/daily/A`;
let zip = DirZip(dirname);

console.log("dirname: ", dirname);
console.log("zip: ", zip);

let err = DirUnzip(zip, curr_path + "/A");
if (err) {
    console.error(err);
} else {
    console.log("unzip success");
}