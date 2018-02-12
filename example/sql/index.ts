import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../run-test";

const getCube = (): Cube => {
    return ACube().SQL(`SELECT
		record_on, 
		SUM(impressions) AS impressions, 
		SUM(uv) AS uv, 
		SUM(click) AS click, 
		SUM(cost) AS cost, 
		SUM(cart) AS cart, 
		SUM(fav_item_count) AS fav_item_count, 
		SUM(fav_shop_count) AS fav_shop_count, 
		SUM(gmv_amt) AS gmv_amt, 
		SUM(gmv_count) AS gmv_count,
		SUM(pay) AS pay,
		SUM(pay_count) AS pay_count 
FROM skyline.zhizuan_client_rpt_daily  
WHERE client_id = 1 
	AND record_on between '2017-03-01' AND '2017-03-31' 
GROUP BY record_on 
ORDER BY record_on`);
};

// main script
RunCube(getCube);
