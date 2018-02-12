import {Cube} from '../../../../cube/cube';
import {simba_client_base_period} from "./cube.sima";
import {zhizuan_client_base_period} from "./cube.zhizuan";
import {CURR_PERIOD} from "./consts";

// 天猫账户整体表现（店铺）
export const client_curr_period = (): Cube => {
    let c = simba_client_base_period(CURR_PERIOD).Link("@ZHIZUAN@", zhizuan_client_base_period(CURR_PERIOD));

    c.SQL(`SELECT platform, impressions, click, ctr, cpc, cost, pay, pay_count, cart, fav_shop_count, roi, cvr, cpu FROM @THIS@ AS s
          UNION ALL
	      SELECT platform, impressions, click, ctr, cpc, cost, pay, pay_count, cart, fav_shop_count, roi, cvr, cpu FROM @ZHIZUAN@ AS z
	`);
    c.GroupSummary("总计", "SUM", ["impressions", "click", "cost", "pay_count", "pay", "cart", "fav_shop_count"])
        .SummarySQL("总计", `SELECT 
		impressions,
		click,
		cost,
		pay_count,
		pay,
		cart,
		fav_shop_count,
		CASE WHEN impressions>0 THEN ROUND(click / impressions, 4) ELSE 0 END AS ctr,
		CASE WHEN click>0 THEN ROUND(cost / click, 4) ELSE 0 END AS cpc,
		CASE WHEN cost>0 THEN ROUND(pay / cost, 4) ELSE 0 END AS roi,
		CASE WHEN click>0 THEN ROUND(pay_count / click, 4) ELSE 0 END AS cvr,
		CASE WHEN pay_count>0 THEN ROUND(cost / pay_count, 4) ELSE 0 END AS cpu
	FROM @SUMMARY@ AS t`);

    return c.RetMapping({
        "platform":       "平台",
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