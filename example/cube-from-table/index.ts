import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../../utils/run-test";

const getCube = (): Cube => {
    return ACube().FromTable("skyline.clients");
};

// main script
RunCube(getCube);
