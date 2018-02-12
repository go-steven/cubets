import {Cube} from '../../../../cube/cube';
import {simba_product_tmp} from "./cube.sima";
import {zhizuan_product_tmp} from "./cube.zhizuan";

export const cube_pruduct = (product: string): Cube => {
    let c = simba_product_tmp(product).Link("@ZHIZUAN@", zhizuan_product_tmp(product));

    c.SQL(`SELECT platform, impressions, click, ctr, cpc, cost, pay_count, cart, fav_shop_count, roi, cvr, cpu FROM @THIS@ AS s
    UNION ALL
	SELECT platform, impressions, click, ctr, cpc, cost, pay_count, cart, fav_shop_count, roi, cvr, cpu FROM @ZHIZUAN@ AS z
	`);

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
    })
};