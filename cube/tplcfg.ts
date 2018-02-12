import {Promise} from 'es6-promise'; // fixed issue： error TS2693: 'Promise' only refers to a type, but is being used as a value here.
import {Row, Rows} from '../source/rows';
import * as fs from 'fs';

export type TplCfg = Row;

export const ReadTplCfgFile = (tplCfgFile: string): TplCfg => {
    let ret: TplCfg = {};
    let content = fs.readFileSync(tplCfgFile).toString().trim();
    if (content === "") {
        return ret;
    }

    let j = JSON.parse(content)
    for (let [k, v] of j) {
        ret[k] = v;
    }

    return ret;
};
