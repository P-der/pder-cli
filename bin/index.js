#!/usr/bin/env node

var yargs = require('yargs');
const { runInitPrompts } = require('./run-prompts');
const { init } = require("./init");
const { init: log } = require("./util/log");

log();

yargs
    .usage('usage: lib [options]')
    .usage('usage: lib <command> [options]')
    .example('lib new mylib','新建一个库 mylib')
    .alias('h', 'help')
    .alias('v', 'version')
    .command(
        ['new', 'n'],
        '新建一个项目', 
        function(yargs) {
            return yargs.option('name', {
                alias: 'n',
                demand: false,
                default: 'mylib',
                describe: 'you library name',
                type: 'string'
            })
        },
        function (argv) {
            runInitPrompts(argv._[1], yargs.argv).then(function (answers) {
                init(argv, answers);
            });
        }
    )
    .epilog('cooyright 2019-2022')
    .demandCommand()
    .argv;