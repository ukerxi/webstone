/**
 * @name home model
 * */
let HomeModel = require('../models/home');

/**
 * @name add 添加数据
 * */
function add (param, callback) {
  const home = new HomeModel({
    name: 'ukerxi',
    text: '测试数据库eee44',
    update: new Date()
  });
  home.save(function (err, res) {
    if (err) {
      // console.log('error:', err)
    } else {
      // console.log('res:', res)
    }
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
 * @name get 添加数据
 * */
function getById (id, callback) {
  HomeModel.findById(id, 'name text updated', function (err, res) {
    // 执行回调
    if (typeof callback === 'function') {
      callback({
        status: err,
        data: res
      });
    }
  })
}

// export
module.exports = {
  add: add,
  getById: getById,
};
