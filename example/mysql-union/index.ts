import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../../engine/run";

const getCube = (): Cube => {
    return ACube().SQL(`SELECT *
	FROM skyline.zhizuan_campaign_rpt_daily AS r1
    WHERE r1.client_id = 1
    	AND r1.record_on BETWEEN '2017-03-06' AND '2017-03-12'
    LIMIT 0, 1
   	UNION
	SELECT r2.*
	FROM skyline.zhizuan_campaign_rpt_daily AS r2
    WHERE r2.client_id = 1
    	AND r2.record_on BETWEEN '2017-03-06' AND '2017-03-12'
    LIMIT 0, 1`);
};

// main script
RunCube(getCube);
