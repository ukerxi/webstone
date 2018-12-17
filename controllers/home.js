/**
 * @name home model
 * */
const HomeModel = require('../models/home').model;
const HomeOrigin = require('../models/home').origin;
const getDbFormatData = require('../core/common').getDbFormatData;

/**
 * @name add 添加数据
 * */
function add (param, callback) {
  const home = new HomeModel(param);
  home.save(function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: err ? {} : getDbFormatData(res, HomeOrigin, false)
      });
    }
  })
}

/**
 * @name getById 查询数据
 * @param {string} id
 * @param {function} callback 回调
 * @param {boolean} isFormat 是否进行格式化types
 * */
function getById (id, callback, isFormat) {
  HomeModel.findById(id, function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: err ? {} : getDbFormatData(res, HomeOrigin, isFormat)
      });
    }
  })
}

/**
 * @name getDataKey 获取默认空数据key
 *  * @param {function} callback 回调
 * @param {boolean} isFormat 是否进行格式化types
 * */
function getDataKey (callback, isFormat) {
  // 执行回调
  if (typeof callback === 'function') {
    callback({
      status: '',
      data: getDbFormatData(HomeOrigin.data, HomeOrigin, isFormat, true)
    });
  }
}

// export
module.exports = {
  add: add,
  getById: getById,
  getDataKey: getDataKey,
};
