import {Cube, ACube} from '../../cube/cube';
import {Reports} from "../../engine/reports";
import {DefaultConn} from "../../utils/dbconn";

const getCube = (): Cube => {
    return ACube().SQL(`SELECT 
		client_id AS ClientId, 
		campaign_id, 
		substr(campaign_name, 1, 2) AS NewCampaignName, 
		campaign_name, 
		record_on, 
		impressions, 
		uv, 
		click, 
		cost
	FROM skyline.zhizuan_campaign_rpt_daily
    WHERE client_id = 1
    	AND record_on BETWEEN '2017-03-06' AND '2017-03-12'
    ORDER BY record_on DESC
    LIMIT 0, 1`);
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
