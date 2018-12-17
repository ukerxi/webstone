/**
 * @name home model
 * */
const UserModel = require('../models/user').model;
const UserOrigin = require('../models/user').origin;
const getDbFormatData = require('../core/common').getDbFormatData;

/**
 * @name add 添加数据
 * */
function add (param, callback) {
  const user = new UserModel({
    account: param.account,
    password: param.password,
    phone: param.phone || '',
    remark: param.remark || '',
    type: param.type || '',
    updated: Date.now()
  });
  user.save(function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: err ? {} : getDbFormatData(res, UserOrigin, false)
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
  UserModel.findById(id, function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: err ? {} : getDbFormatData(res, UserOrigin, isFormat)
      });
    }
  })
}

/**
 * @name getByParam 根据参数进行查询
 * @param {string} param 查询的参数条件
 * @param {function} callback 回调
 * @param {object} options 查询的配置
 * @param {boolean} isFormat 是否进行格式化types
 * */
function getByParam (param, callback, options, isFormat) {
  UserModel.find(param, options || {}, function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: err ? {} : getDbFormatData(res, UserOrigin, isFormat)
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
  UserModel.findByIdAndUpdate(id, options || {}, function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: err ? {} : getDbFormatData(res, UserOrigin, isFormat)
      });
    }
  })
}

/**
 * @name initUser 初始化用户（用户数据库中为空，添加默认用户账户 webstone / 123456）
 * */
function counts (options, callback) {
  UserModel.estimatedDocumentCount(options || {}, function (err, res) {
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
 * @name initUser 初始化用户（用户数据库中为空，添加默认用户账户 webstone / 123456）
 * */
function initUser() {
  const _account = 'webstone';
  const _password = '123456';
  counts({}, function (res) {
    if (res.data === 0) {
      // 添加用户
      add({
        account: _account,
        password: _password,
        phone: '',
        remark: '默认用户',
        type: '',
      }, function () {
        // console.log('添加用户成功！')
        // do something
      });
    }
  });
}
// 执行初始化函数
initUser();
// export
module.exports = {
  add: add,
  getById: getById,
  getByParam: getByParam,
  update: update,
};
