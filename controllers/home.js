/**
 * @name home model
 * */
const HomeModel = require('../models/home').model;
const HomeOrigin = require('../models/home').origin;
const getSeriesType = require('../core/common').getSeriesType;

/**
 * @name add 添加数据
 * */
function add (param, callback) {
  const home = new HomeModel({
    name: 'ukerxi',
    text: '测试数据库eee44',
    isShow: '1',
    update: Date.now()
  });
  home.save(function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: res
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
  HomeModel.findById(id, 'name text updated isShow flag', function (err, res) {
    // 执行回调
    console.log(err)
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: err ? {} : (isFormat ? getSeriesType(res, HomeOrigin) : res.toObject())
      });
    }
  })
}

// export
module.exports = {
  add: add,
  getById: getById,
};
