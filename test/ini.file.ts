import {LoadIniCfgs} from "../utils/inifile";

let config = LoadIniCfgs('/var/code/go/config.cfg', 'masterdb');
console.log("config: ", config);

let host = config['host'].trim();
let pos = host.lastIndexOf(':3306');
console.log("pos=", pos);
if (pos >= 0) {
    host = host.substring(0, pos);
}
console.log("host: ", host);
