import {RunReportsWithCfgs} from "../../../run-test";
import {getReports} from "./reports";

// run test script
RunReportsWithCfgs(getReports, {
    "START_DATE": "2017-01-01",
    "PERIOD":   "YEAR",
    "CLIENT_ID":  10,
});