import {Reports} from "../engine/reports";
import {Cube} from '../cube/cube';
import {TplCfg} from "../cube/tplcfg";
import {DefaultConn} from "../utils/default.conn";

export const RunCube = (f: () => Cube, name: string="cube") => {
    RunReports((): Reports => {
        return new Reports().AddCube(name, f());
    });
};

export const RunReports = (f: () => Reports, tplcfg: TplCfg = {}) => {
    f().Run(tplcfg).then((reports)=>{
        console.info("reports: ", JSON.stringify(reports));
    }).catch((err)=>{
        console.error(err);
    }).finally(() => {
        DefaultConn.end();
    });
};
