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
  const home = new HomeModel({
    name: 'ukerxi',
    text: '测试数据库eee44555',
    isShow: '1',
    updateTime: Date.now()
  });
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

// export
module.exports = {
  add: add,
  getById: getById,
};
