import {ACube} from '../cube/cube';

let c = ACube().FromTable("skyline.clients");

c.Fields().then((fields: string[])=>{
    console.info("result fields: ", fields);
}).catch((err)=>{
    console.error(err);
});

c.Row().then((data_row: {[key: string]: any}) =>{
    console.info("result row: ", data_row);
}).catch((err)=>{
    console.error(err);
});

c.Rows().then((data_rows: {[key: string]: any}[]) =>{
    console.info("result rows: ", data_rows);
}).catch((err)=>{
    console.error(err);
});

