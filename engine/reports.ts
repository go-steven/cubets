import {Promise} from 'es6-promise'; // fixed issue： error TS2693: 'Promise' only refers to a type, but is being used as a value here.
import {Row, Rows, SummaryRows} from '../source/rows';
import {Cube} from '../cube/cube';
import {ReadTplCfgFile, TplCfg} from '../cube/tplcfg';
import {series, mapSeries} from 'async';

class ReportRet {
    Name: string;
    Display: any;
    Fields: string[];
    Data: Rows;
    Summary: SummaryRows;
}

type ReportRets = {[key: string]: ReportRet};

class Reports {
    data: {[key: string]: Cube};

    constructor() {
        this.data = {};
    }

    AddCube = (name: string, c: Cube): Reports => {
        let self = this;
        name = name.trim();
        if (name != "") {
            self.data[name] = c;
        }
        return self;
    };

    Cubes = (): {[key: string]: Cube} => {
        let self = this;

        let ret: {[key: string]: Cube} = {};
        for (let k in self.data) {
            ret[k] = self.data[k];
        }
        return ret;
    };

    Run = () => {
        return this.RunWithCfgs({})
    };

    RunWithCfgs = (tplcfgs: TplCfg) => {
        console.info("RunWithCfgs().");
        let self = this;
        return new Promise((
            resolve: (reports: ReportRets) => void,
            reject: (err: any) => void
        ) => {
            let ret: ReportRets = {};
            let cubes = self.Cubes();
            // 同步一组操作
            mapSeries((():string[]=>{
                let keys: string[] = [];
                for (let k in cubes) {
                    keys.push(k);
                }
                console.info("mapSeries: keys=", keys);
                return keys;
            })(), (k: string, callback) => {
                let c = cubes[k].Copy();
                c.Replace(tplcfgs);
                getReportFromCube(k, c).then((report: ReportRet) => {
                    ret[k] = report;
                    return callback(undefined, k);
                }).catch((err) => {
                    return callback(err, undefined);
                });
            }, (err, results: any) => { // 汇总操作结果
                if (err) {
                    return reject(err);
                }
                return resolve(ret);
            });
        });
    };

    RunAndSave = () => {
    };

}

const getReportFromCube = (name: string, c: Cube) => {
    console.info("getReportFromCube, name:", name);
    return new Promise((
        resolve: (report: ReportRet) => void,
        reject: (err: any) => void
    ) => {
        let report = new ReportRet();
        report.Name = name;

        // 同步多个操作
        series([
            (callback) => { // fetch fields
                c.Fields().then((fields: string[]) => {
                    report.Fields = fields;
                    return callback(undefined, "fields");
                }).catch((err) => {
                    return callback(err, undefined);
                });
            },
            (callback) => { // fetch summary
                c.Summary().then((data_rows: SummaryRows) => {
                    report.Summary = data_rows;
                    return callback(undefined, "summary");
                }).catch((err) => {
                    return callback(err, undefined);
                });
            },
            (callback) => { // fetch rows
                c.Rows().then((data_rows: Rows) => {
                    report.Data = data_rows;
                    return callback(undefined, "rows");
                }).catch((err) => {
                    return callback(err, undefined);
                });
            },
        ], function (err, results) { // 汇总操作结果
            if (err) {
                return reject(err);
            }

            return resolve(report);
        });
    });
};

export {Reports, ReportRet, ReportRets};
