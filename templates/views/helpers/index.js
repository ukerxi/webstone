/**
 * @name hbs helpers
 * */
const _ = require('lodash');
module.exports = function() {
    let _helpers = {};

    _helpers.isFun = function(obj) {
        return _.isFunction(obj);
    };

    return _helpers;
};
