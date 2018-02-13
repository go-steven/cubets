import * as fs from 'fs';
import * as ini from 'ini';

export const LoadIniCfgs = (iniFile: string, section: string, separator = ':') => {
    let ret: {[key: string]: string} = {};
    const config = ini.parse(fs.readFileSync(iniFile, 'utf-8'));
    if (config.hasOwnProperty(section)) {
        for (let k in config[section]) {
            let vals = k.split(separator);
            if (vals.length >= 2) {
                ret[vals[0]] = vals[1];
            }
            if (vals.length > 2) {
                ret[vals[0]] = vals[1] + separator + vals[2];
            }
        }
    }
    return ret;
};
