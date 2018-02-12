import {Row} from '../source/rows';
import * as fs from 'fs';

export type TplCfg = Row;

export const ReadTplCfgFile = (tplCfgFile: string): TplCfg => {
    let ret: TplCfg = {};
    let content = fs.readFileSync(tplCfgFile).toString().trim();
    if (content === "") {
        return ret;
    }

    let j = JSON.parse(content);
    for (let [k, v] of j) {
        ret[k] = v;
    }

    return ret;
};
