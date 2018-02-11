import {mapSeries} from 'async';

const arr: {[key: string]: string} = {
    "a": "11",
    "b": "12",
};

let keys = [];
for (let k in arr) {
    keys.push(k);
}
mapSeries(keys, function(item, callback){
    let v = arr[item];
    console.log("item:", item, ", val: ", v);
    callback(undefined, v);
}, function(err, results){
    console.log("err:", err);
    console.log("results:", results);
});