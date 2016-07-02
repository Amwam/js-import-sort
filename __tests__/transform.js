jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'transform', null, 'WithoutComments');
defineTest(__dirname, 'transform', null, 'WithComments');
