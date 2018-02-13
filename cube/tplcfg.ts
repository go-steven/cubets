import * as fs from 'fs';
import {Row} from '../source/rows';

export type TplCfg = Row;

export const ReadTplCfgFile = (tplCfgFile: string): TplCfg => {
    let content = fs.readFileSync(tplCfgFile).toString().trim();
    if (content === "") {
        return {};
    }

    let ret = JSON.parse(content) as TplCfg;
    if (ret) {
        return ret;
    } else {
        return {};
    }
};
