import {Cube, ACube} from '../../cube/cube';
import {RunCube} from "../run-test";

const getCube = (): Cube => {
    let c = ACube().SQL("SELECT * FROM skyline.clients");
    return c.SQL(`SELECT t.* FROM @THIS@ AS t WHERE t.id=10`)
};

// main script
RunCube(getCube);
