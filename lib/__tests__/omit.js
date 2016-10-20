/*!
 * object.omit <https://github.com/jonschlinkert/object.omit>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var omit = require('../omit');

describe('.omit()', function () {
  it('should omit the given key from the object.', function () {
    expect(omit({a: 'a', b: 'b', c: 'c'}, 'a')).toEqual({ b: 'b', c: 'c' });
  });

  it('should omit the given keys from the object.', function () {
    expect(omit({a: 'a', b: 'b', c: 'c'}, ['a', 'c'])).toEqual({ b: 'b' });
  });

  it('should return the object if no keys are specified.', function () {
    expect(omit({a: 'a', b: 'b', c: 'c'})).toEqual({a: 'a', b: 'b', c: 'c'});
  });

  it('should take a filter function as the last argument.', function () {
    var foo = omit({a: 'a', b: 'b', c: 'c'}, function (val, key) {
      return key === 'a';
    });
    var fn = function() {};
    var bar = omit({a: 'a', b: 'b', c: fn}, function (val, key) {
      return typeof val !== 'function';
    });
    expect(foo).toEqual({a: 'a'});
    expect(bar).toEqual({a: 'a', b: 'b'});
  });

  it('should copy properties to a new object.', function () {
    var foo = {a: 'a', b: 'b', c: 'c', d: 'd'};
    var bar = omit(foo, ['d'], function (val, key) {
      return key === 'a' || key === 'd';
    });
    expect(foo).toEqual({a: 'a', b: 'b', c: 'c', d: 'd'});
    expect(bar).toEqual({a: 'a'});
  });

  it('should return an empty object if the first arg is not an object.', function () {
    expect(omit(null, {a: 'a', b: 'b', c: 'c'})).toEqual({});
  });

  it('should return an empty object if no object is specified.', function () {
    expect(omit()).toEqual({});
  });
});
