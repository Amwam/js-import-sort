#!/usr/bin/env node
const argv = require('nomnom')
    .script('js-import-sort')
    .options({
        path: {
            position: 1,
            help: 'Files or directory to transform',
            list: true,
            metavar: 'FILE',
            required: true,
        },
        ignorePattern: {
            full: 'ignore',
            list: true,
        },
        verbose: {
            abbr: 'v',
            full: 'verbose',
            flag: true,
        },
        dry: {
            abbr: 'd',
            full: 'dry',
            flag: true,
        },
        print: {
            abbr: 'p',
            full: 'print',
            flag: true,
        },
    })
    .parse();

require('./index.js')(argv);
