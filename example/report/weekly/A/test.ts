import {RunReports} from "../../../../utils/run-test";
import {getReports} from "./reports";

// run test script
RunReports(getReports, {
    "START_DATE": "2017-01-01",
    "PERIOD":   "YEAR",
    "CLIENT_ID":  10,
});