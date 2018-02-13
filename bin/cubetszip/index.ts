#!/usr/bin/env node

const program = require('commander');

program
    .version('0.0.1', '-v, --version')
    .option('-dir, --dir [path]', 'set tpl script dir', "")
    .option('-output, --output [filename]', 'set output file', "")
    .option('-index, --index [true]', 'whether include the example index.ts', false)
    .parse(process.argv);

console.info(`input params: dir=${program.dir}, output=${program.output}, index=${program.index}`);
