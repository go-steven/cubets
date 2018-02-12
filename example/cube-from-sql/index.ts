import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../run-test";

const getCube = (): Cube => {
    return ACube().SQL("SELECT * FROM skyline.clients");
};

// main script
RunCube(getCube);
