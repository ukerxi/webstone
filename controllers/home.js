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
    title: param.title,
    notice: param.notice,
    isShow: !!param.isShow,
    showTime: param.showTime || Date.now(),
    banners: param.banners,
    backgroundColor: param.backgroundColor,
    remark: param.remark
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
 * @name update 更新数据
 * @param {string} id
 * @param {function} callback 回调
 * @param {object} options 更新的参数
 * @param {boolean} isFormat 是否进行格式化types
 * */
function update (id, callback, options, isFormat) {
  HomeModel.findByIdAndUpdate(id, options || {}, function (err, res) {
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
 * @name getById 查询数据
 * @param param 查询数据的筛选条件
 * @param {function} callback 回调
 * @param {boolean} isFormat 是否进行格式化types
 * */
function getOne (param, callback, isFormat) {
  HomeModel.findOne(param || {}, function (err, res) {
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


/**
 * @name initUser 初始化用户（用户数据库中为空，添加默认用户账户 webstone / 123456）
 * */
function counts (options, callback) {
  HomeModel.estimatedDocumentCount(options || {}, function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: res || 0
      });
    }
  })
}

/**
 * @name initHome 初始化首页数据
 * */
function initHome() {
  counts({}, function (res) {
    if (res.data === 0) {
      // 添加用户
      add({
        title: 'webstone',
        notice: '',
        isShow: '0',
        showTime: '',
        banners: [],
        backgroundColor: '',
        remark: '',
        operator: '',
      }, function () {
        // console.log('添加用户成功！')
        // do something
      });
    }
  });
}
// 执行初始化函数
initHome();

// export
module.exports = {
  add: add,
  update: update,
  getById: getById,
  getOne: getOne,
  getDataKey: getDataKey,
};
