import {Reports} from "../../../../engine/reports";
import {client_curr_period} from "./report.client.shop";
import {sima_client_period} from "./report.client.simba";
import {zhizuan_client_period} from "./report.client.zhizuan";
import {cube_pruduct} from "./cube.product";
import {EC, FC, PC} from "./consts";
import {simba_item} from "./report.simba.item";
import {zhizuan_item} from "./report.zhizuan.item";

export const getReports = (): Reports => {
    return new Reports()
        .AddCube("天猫账户整体表现（店铺）", client_curr_period())
        .AddCube("天猫账户整体表现（直通车）", sima_client_period())
        .AddCube("天猫账户整体表现（钻展）", zhizuan_client_period())
        .AddCube("直通车 & 钻展分类表现（EC）", cube_pruduct(EC))
        .AddCube("直通车 & 钻展分类表现（FC）", cube_pruduct(FC))
        .AddCube("直通车 & 钻展分类表现（PC）", cube_pruduct(PC))
        .AddCube("直通车子分类表现", simba_item())
        .AddCube("钻展子分类表现", zhizuan_item());
};