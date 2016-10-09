jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'transform', null, 'WithoutComments');
defineTest(__dirname, 'transform', null, 'WithComments');
defineTest(__dirname, 'transform', null, 'CombineImports');
defineTest(__dirname, 'transform', null, 'BlankLines');
defineTest(__dirname, 'transform', null, 'NonImport');
