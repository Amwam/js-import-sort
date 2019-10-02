var isObject = require("is-extendable");

module.exports = function omit(obj) {
  if (!isObject(obj)) return {};

  var keys = [].concat.apply([], [].slice.call(arguments, 1));
  var last = keys[keys.length - 1];
  var res = {},
    fn;

  if (typeof last === "function") {
    fn = keys.pop();
  }

  var isFunction = typeof fn === "function";
  if (!keys.length && !isFunction) {
    return obj;
  }

  Object.keys(obj).map(key => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (keys.indexOf(key) === -1) {
        if (!isFunction) {
          res[key] = value;
        } else if (fn(value, key, obj)) {
          res[key] = value;
        }
      }
    }
  });

  return res;
};
