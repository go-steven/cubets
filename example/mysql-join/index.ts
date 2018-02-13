import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../../engine/run";

const getCube = (): Cube => {
    return ACube().SQL(`SELECT
		r.*
	FROM skyline.simba_adgroup_rpt_daily AS r
   INNER JOIN skyline.simba_adgroups AS ad ON (
		ad.id = r.adgroup_id
    )
    LEFT JOIN skyline.simba_items AS item ON (
		item.id = ad.num_iid
    )
    WHERE ad.client_id = 1
    	AND r.record_on BETWEEN '2017-03-06' AND '2017-03-12'
    ORDER BY r.record_on DESC
    LIMIT 0, 10`);
};

// main script
RunCube(getCube);
