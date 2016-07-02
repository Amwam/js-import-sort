const Runner = require('jscodeshift/dist/Runner');
const  omit  = require('lodash').omit;
const resolve = require('path').resolve;

module.exports = args => {
    const options = Object.assign({ quote: 'single' }, omit(args, ['_', 'transform', 'path']));
    Runner.run(resolve(__dirname, `./transform.js`), args.path, options);
};
