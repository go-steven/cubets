import * as fs from 'fs';
import * as ini from 'ini';

let config = ini.parse(fs.readFileSync('/var/code/go/config.cfg', 'utf-8'));
//console.log("config: ", config);

//console.log("masterdb", config.masterdb);
for (let k in config.masterdb) {
    let vals = k.split(':');
    if (vals.length === 2 || vals.length === 3) {
        console.log(`${vals[0]} = ${vals[1]}`);
    }
}

