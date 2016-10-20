'use strict';

const findRoot = require('find-root');
const packageJson = require(findRoot(process.cwd()) + '/package.json');

const dependencies = {};

if (packageJson) {
    Object.assign(dependencies, packageJson.dependencies);
    Object.assign(dependencies, packageJson.devDependencies | {});
}

module.exports = { default: Object.keys(dependencies) };
