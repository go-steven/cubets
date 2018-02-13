import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../../engine/run";

const getCube = (): Cube => {
    let c1 = ACube().FromTable("skyline.simba_adgroup_rpt_daily");
    let c2 = ACube().FromTable("skyline.simba_adgroups");
    let c3 = ACube().FromTable("skyline.simba_items");

    c1.Link("@AD_GROUPS@", c2).Link("@ITEMS@", c3);

    return c1.SQL(`SELECT
		r.*
	FROM @THIS@ AS r
   INNER JOIN @AD_GROUPS@ AS ad ON (
		ad.id = r.adgroup_id
    )
    LEFT JOIN @ITEMS@ AS item ON (
		item.id = ad.num_iid
    )
    WHERE ad.client_id = 1
    	AND r.record_on BETWEEN '2017-03-06' AND '2017-03-12'
    ORDER BY r.record_on DESC
    LIMIT 0, 10
`);
};

// main script
RunCube(getCube);
