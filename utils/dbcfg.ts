import * as fs from 'fs';
import * as ini from 'ini';

const DEFAULT_CFG = '/var/code/go/config.cfg';

export const DefaultDbCfg = () => {
    let ret: {[key: string]: string} = {};
    const config = ini.parse(fs.readFileSync(DEFAULT_CFG, 'utf-8'));
    if (config.hasOwnProperty('masterdb')) {
        for (let k in config.masterdb) {
            let vals = k.split(':');
            if (vals.length >= 2) {
                ret[vals[0]] = vals[1];
            }
        }
    }
    return ret;
};
