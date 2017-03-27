const importSort = require('../importSort');
test('Sorts based on string', () => {
  expect(importSort('b', 'a')).toBe(1);
  expect(importSort('a', 'b')).toBe(-1);
});

test('Sorts relative imports', () => {
  expect(importSort('../b', '../a')).toBe(1);
  expect(importSort('../a', '../b')).toBe(-1);
  expect(importSort('../b', 'a')).toBe(1);
  expect(importSort('b', '../a')).toBe(-1);
});
