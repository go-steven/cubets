import {Cube, ACube} from '../../cube/cube';
import {Reports} from "../../engine/reports";
import {DefaultConn} from "../../utils/dbconn";

const getCube = (): Cube => {
    return ACube().SQL("SELECT * FROM skyline.clients");
};

// main script
// main script
new Reports().AddCube("example", getCube())
    .Run().then((reports)=>{
    console.info("reports: ", JSON.stringify(reports));
}).catch((err)=>{
    console.error(err);
}).finally(() => {
    DefaultConn.end();
});
