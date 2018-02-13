import {DefaultConn} from "../utils/dbconn";
import {Reports} from "../engine/reports";
import {Cube} from '../cube/cube';
import {TplCfg} from "../cube/tplcfg";

export const RunCube = (f: () => Cube) => {
    RunReports((): Reports => {
        return new Reports().AddCube("example", f());
    });
};

export const RunReports = (f: () => Reports) => {
    RunReportsWithCfgs(f, {});
};

export const RunReportsWithCfgs = (f: () => Reports, tplcfg: TplCfg) => {
    f().RunWithCfgs(tplcfg).then((reports)=>{
        console.info("reports: ", JSON.stringify(reports));
    }).catch((err)=>{
        console.error(err);
    }).finally(() => {
        DefaultConn.end();
    });
};
