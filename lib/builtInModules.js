'use strict';

var blacklist = [
    'freelist',
    'sys'
];

module.exports = {
    default: Object.keys(process.binding('natives')).filter(function(el) {
        return !/^_|^internal|\//.test(el) && blacklist.indexOf(el) === -1;
    }).sort()
};
