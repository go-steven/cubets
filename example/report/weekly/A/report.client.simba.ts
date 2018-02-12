import {Cube} from '../../../../cube/cube';
import {simba_client_base_period} from "./cube.sima";
import {CURR_PERIOD, LAST_PERIOD} from "./consts";

// 天猫账户整体表现（直通车）
export const sima_client_period = (): Cube => {
    let c = simba_client_base_period(CURR_PERIOD).Link("@LAST@", simba_client_base_period(LAST_PERIOD));

    c.SQL(`SELECT record_on, impressions, click, ctr, cpc, cost, pay_count, pay, cart, fav_shop_count, roi, cvr, cpu FROM @THIS@ AS c
          UNION ALL
	      SELECT record_on, impressions, click, ctr, cpc, cost, pay_count, pay, cart, fav_shop_count, roi, cvr, cpu FROM @LAST@ AS l
	 `);
    c.ContrastSummary("对比", ["impressions", "click", "ctr", "cpc", "cost", "pay_count", "pay", "cart", "fav_shop_count", "roi", "cvr", "cpu"]);

    return c.RetMapping({
        "record_on":      "Date",
        "impressions":    "Impression",
        "click":          "Click",
        "ctr":            "CTR",
        "cpc":            "CPC",
        "cost":           "Spend",
        "pay_count":      "Order",
        "pay":            "Sale",
        "cart":           "Cart",
        "fav_shop_count": "Fav",
        "roi":            "ROI",
        "cvr":            "CVR",
        "cpu":            "CPU",
    });
};