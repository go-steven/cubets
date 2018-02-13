import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../../utils/run-test";

const getCube = (): Cube => {
    let c = ACube().SQL("SELECT * FROM skyline.clients");
    return ACube().From(c);
};

// main script
RunCube(getCube);
