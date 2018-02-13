import {RunReportsWithCfgs} from "../../../../utils/run-test";
import {getReports} from "./report";

// run test script
RunReportsWithCfgs(getReports, {
    "START_DATE": "2017-12-01",
    "END_DATE":   "2017-12-31",
});