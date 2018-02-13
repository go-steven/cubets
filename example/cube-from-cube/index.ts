import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../../engine/run";

const getCube = (): Cube => {
    let c = ACube().SQL("SELECT * FROM skyline.clients");
    return ACube().From(c);
};

// main script
RunCube(getCube);
