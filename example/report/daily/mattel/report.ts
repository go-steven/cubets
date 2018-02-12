import {Reports} from "../../../../engine/reports";
import {all_clients_stats} from "./all.clients.stats";
import {client_stats} from "./client.stats";
const util = require('util');

/*
美泰日报汇总
*/
export const getReports = (): Reports => {
    let r = new Reports();
    const clientIds: number[]= [10, 9, 8, 6, 7, 17, 5];
    // 所有客户汇总统计报表
    r.AddCube("client_zhizuan_daily_report_0_0", all_clients_stats(clientIds));
    // 单个客户统计报表
    for (let i= 0; i < clientIds.length; i++) {
    	let v = clientIds[i];
        r.AddCube(util.format(`client_zhizuan_daily_report_%d_c%d`, i+1, v), client_stats(v));
    }

    return r;
};

