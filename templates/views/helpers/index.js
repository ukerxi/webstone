/**
 * @name hbs helpers
 * */
const _ = require('lodash');
module.exports = function () {
  let _helpers = {};
  // standard hbs equality check, pass in two values from template
  _helpers.ifeq = function (a, b, options) {
    if (a == b) { // eslint-disable-line eqeqeq
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  };
  // 提供url的相对路径，方便切换资源
  _helpers.baseUrl = function (url, options) {
    return '' + url;
  };

  return _helpers;
};
