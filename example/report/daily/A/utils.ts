import {TplCfg} from "cubets/cube/tplcfg";
import {Reports} from "cubets/engine/reports";
import {Cube} from 'cubets/cube/cube';
import {Mysql} from "cubets/source/mysql";

export const RunReportsWithCfgs = (f: () => Reports, tplcfg: TplCfg) => {
    f().RunWithCfgs(tplcfg).then((reports)=>{
        console.info("reports: ", JSON.stringify(reports));
    }).catch((err)=>{
        console.error(err);
    }).finally(() => {
        //DefaultConn.end();
    });
};

// new cube with default connection
export const ACube = (): Cube => {
    return new Cube(new Mysql(DefaultConn));
};
