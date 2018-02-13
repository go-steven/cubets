import {simba_daily_report} from "./simba.daily.report";
import {zhizuan_daily_report} from "./zhizuan.daily.report";
import {Reports} from "cubets/engine/reports";

export const getReports = (): Reports => {
    return new Reports()
        .AddCube("client_simba_daily_report", simba_daily_report())
        .AddCube("client_zhizuan_daily_report", zhizuan_daily_report());
};