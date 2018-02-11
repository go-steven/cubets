import {Cube, ACube} from '../../cube/cube';
import {Reports} from "../../engine/reports";

const cube_from_table = (): Cube => {
    return ACube().FromTable("skyline.clients")
};

// main script
let reports = new Reports()
    .AddCube("cube from table example", cube_from_table())
    .Run().then((reports)=>{
        console.info("reports: ", JSON.stringify(reports));
    }).catch((err)=>{
        console.error(err);
    });
