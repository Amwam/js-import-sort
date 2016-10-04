'use strict';

module.exports = (a, b) => {
    if (a.startsWith('.') && !b.startsWith('.')) {
        return 1
    }
    else if (b.startsWith('.') && !a.startsWith('.')) {
        return -1
    }
    return a.localeCompare(b)
};
