import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../../engine/run";

const getCube = (): Cube => {
    let c1 = ACube().SQL(`SELECT *
	FROM skyline.zhizuan_campaign_rpt_daily
    WHERE client_id = 1
    	AND record_on BETWEEN '2017-03-06' AND '2017-03-12'
    ORDER BY record_on DESC
    LIMIT 0, 1`);
    let c2 = ACube().SQL(`SELECT *
	FROM skyline.zhizuan_campaign_rpt_daily
    WHERE client_id = 1
    	AND record_on BETWEEN '2017-03-06' AND '2017-03-12'
    ORDER BY record_on DESC
    LIMIT 0, 1`);

    c1.Link("@XXX@", c2);

    return c1.SQL(`SELECT * FROM @THIS@ AS t
   	UNION
	SELECT * FROM @XXX@ AS x`);
};

// main script
RunCube(getCube);
