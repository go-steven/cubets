import * as fs from 'fs';
import * as path from 'path';

export const DirZip = (dir: string, addMain: boolean = false): string => {
    let ret: {[key: string]: string} = {};
    if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
        fs.readdirSync(dir).forEach((filename: string) => {
            let fullename = path.join(dir, filename);
            let stats = fs.statSync(fullename);
            if (stats.isFile()) {
                let ext = path.extname(filename);
                if (ext === '.ts' || ext === '.json') {
                    ret[filename] = fs.readFileSync(fullename).toString();
                }
            }
        });
    }
    return JSON.stringify(ret);
};

export const DirUnzip = (zip: string, dirname: string, addMain: boolean = false): any => {
    if (!fs.existsSync(dirname) || !fs.statSync(dirname).isDirectory()) {
        return `dir[${dirname}] not exists.`;
    }

    let content_map = <{[key: string]: string}>JSON.parse(zip);
    if (!content_map) {
        return `ERROR Unmarshal: ${zip}`;
    }

    for (let k in content_map) {
        fs.writeFileSync(path.join(dirname, k), content_map[k]);
    }

    return null;
};