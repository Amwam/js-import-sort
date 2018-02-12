jest.mock('find-root', () => jest.fn(() => './__tests__'));

const thirdPartyModules = require('../thirdPartyModules').default;
test('merges dependencies and devDependencies', () => {
  expect(thirdPartyModules).toEqual(['dependency', 'dev-dependency']);
});
