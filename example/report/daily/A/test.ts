import {RunReportsWithCfgs} from "../../../run-test";
import {getReports} from "./reports";

// run test script
RunReportsWithCfgs(getReports, {
    "START_DATE": "2017-12-01",
    "END_DATE":   "2017-12-31",
    "CLIENT_ID":  10,
});