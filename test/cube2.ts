import {ACube} from '../cube/cube';
import {series} from 'async';

let c = ACube().FromTable("skyline.clients");
series([
    (callback) => {
        c.Fields().then((fields) => {
            console.info("fields: ", fields);
            return callback(undefined, "fields");
        }).catch((err) => {
            return callback(err, undefined);
        });
    },
    (callback) => {
        c.Row().then((data_row) => {
            console.info("row: ", data_row);
            return callback(undefined, "row");
        }).catch((err) => {
            return callback(err, undefined);
        });
    },
    (callback) => {
        c.Rows().then((data_rows) => {
            console.info("rows: ", data_rows);
            return callback(undefined, "rows");
        }).catch((err) => {
            return callback(err, undefined);
        });
    },
    ], function(err, results) {
        if (err) {
            console.error(err);
            return;
        }

        console.log("results: ", JSON.stringify(results));
});
