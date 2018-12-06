/**
 *  @name common utils
 * */

const _ = require('lodash');
const path = require('path');

/**
 *  @name logTips 提示弹框
 *  @param {string} str tips info
 *  @param {object} options tips config
 * */

function logTips(str, options) {
  console.log(str);
}

/**
 *  @name registerRoute 注册路由
 *  @param {string} path 路由匹配的路径
 *  @param {string} viewName view 的文件名字
 *  @return {array} 路由数据
 * */
function registerRoute(path, viewName) {
  // handle routes
  let _list = [];
  const _handler = require(getPath(viewName, '../routes/views/'));
  if (_.isFunction(_handler)) {
    _list.push({
      path: '/',
      handler: _handler,
    });
  } else if (_.isArray(_handler)) {
    _.forEach(_handler, function (item) {
      _list.push({
        path: item.path === '/' ? path : path + item.path,
        handler: item.handler,
        method: item.method,
      });
    });
  }
  return _list;
}

/**
 *  @name getPath 获取根目录下的路劲
 *  @param {string} str 匹配的文件
 *  @param {string} relativePath 相对根目录文件
 *  @return {string} 相对根目录文件路径
 * */
function getPath(str, relativePath) {
  // 直接定位到 views 文件夹下
  const _relativePath = relativePath || './../';
  return path.join(__dirname, _relativePath, str);
}

/**
 *  @name getSeriesType 数据类型系列化
 *  @param {object} res 数据实例
 *  @param {object} origin 初始化的数据配置
 *  @return {object} 系列化后的数据
 * */
function getSeriesType(res, origin) {
  let _res = {};
  let _data = {};
  if (res) {
    _data = res.toObject();
  }
  _.forEach(_data, function (item, key) {
    if (['updated', '_id', 'flag'].indexOf(key) === -1) {
      // 排除一些不必须的数据
      _res[key] = {
        data: item,
        type: (origin.data[key] && origin.data[key].type) || 'String'
      }
    } else {
      _res[key] = item
    }
  });
  return _res;
}

/**
 *  @name getResFormat 返回数据的模板
 *  @param {object} param 初始数据
 *  @return {object} 模板
 * */
function getResFormat(param) {
  let _res = {
    code: '0000',
    data: {},
    info: '获取成功'
  };
  const _param = param || {};
  _res = _.merge(_res, _param);
  return _res;
}

// export module
module.exports = {
  log: logTips,
  registerRoute: registerRoute,
  getPath: getPath,
  getSeriesType: getSeriesType,
  getResFormat: getResFormat,
};
