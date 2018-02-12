import {Cube, ACube} from '../../cube/cube';
import {Reports} from "../../engine/reports";
import {DefaultConn} from "../../utils/dbconn";

const getCube = (): Cube => {
    let c = ACube().SQL(`SELECT
		record_on,
		SUM(impressions) AS total_impressions,
		SUM(uv) AS total_uv,
		SUM(click) AS total_click,
		SUM(cost) AS total_cost
	FROM skyline.zhizuan_campaign_rpt_daily
    WHERE client_id = 1
    	AND record_on BETWEEN '2017-03-06' AND '2017-03-12'
    GROUP BY record_on`);

    c.SummarySQL("总计", `SELECT SUM(total_impressions) AS total_impressions,
		SUM(total_uv) AS total_uv,
		SUM(total_click) AS total_click,
		SUM(total_cost) AS total_cost,
		ROUND(IF(SUM(total_impressions)=0, 0, SUM(total_click) / SUM(total_impressions)),2) AS cpc
FROM @CUBE@ AS t`);

    return c;
};

// main script
new Reports().AddCube("example", getCube())
    .Run().then((reports)=>{
    console.info("reports: ", JSON.stringify(reports));
}).catch((err)=>{
    console.error(err);
}).finally(() => {
    DefaultConn.end();
});
