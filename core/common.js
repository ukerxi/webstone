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
 *  @param {string} directoryName 寻找文件名的routes下文件夹名字
 *  @return {array} 路由数据
 * */
function registerRoute(path, viewName, directoryName) {
  // handle routes
  let _list = [];
  const _directoryName = directoryName || 'views';
  const _handler = require(getPath(viewName, '../routes/' + _directoryName + '/'));
  if (_.isFunction(_handler)) {
    _list.push({
      path: '/',
      handler: _handler,
    });
  } else if (_.isArray(_handler)) {
    _.forEach(_handler, function (item) {
      _list.push({
        path: item.path === '/' ? ((_directoryName === 'views' && path !== '/') ? (path + '.html') : path ): path + item.path,
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
 *  @name getDbFormatData 数据类型系列化
 *  @param {object} res 数据实例
 *  @param {object} origin 初始化的数据配置
 *  @param {boolean} isFormat 初始化的数据配置
 *  @param {boolean} isDefault 是否是获取默认数据
 *  @return {object} 系列化后的数据
 * */
function getDbFormatData(res, origin, isFormat) {
  let isDefault = false; // 是否是获取默认数据
  if (arguments.length > 3) {
    isDefault = arguments[3] || false
  }
  let _res = {};
  let _data = {};
  if (res && res.toObject) {
    _data = res.toObject({minimize: false, versionKey: false});
  } else {
    _data = res || {}
  }
  if (_.isArray(_data)) {
    _res = [];
    _.forEach(_data, function (item, key) {
      let _item = '';
      if (item && item.toObject) {
        _item = item.toObject({minimize: false, versionKey: false})
      } else {
        _item = item
      }
      let _cache = {};
      if (_.isObject(_item)) {
        _.forEach(_item, function (subItem, subKey) {
          const _result = check(subItem, subKey);
          _cache[_result.key] = _result.data
        });
      } else {
        _cache = item
      }
      _res.push(_cache);
    });
  } else {
    _.forEach(_data, function (item, key) {
      const _result = check(item, key)
      _res[_result.key] = _result.data
    });
  }
  // 过滤数据
  function check(item, key) {
    let result = {
      key: key,
      data: item
    };
    if (['__v'].indexOf(key) === -1) {
      // 排除一些数据库字段
      if (['updateTime', 'createTime', '_id', 'flag'].indexOf(key) === -1) {
        // 排除一些不必须的数据
        if (isFormat) {
          // 格式化返回，类型
          result.data = {
            data: isDefault ? (item.default || '' ) : item,
            type: (origin.data[key] && origin.data[key].type) || 'String'
          }
        } else {
          // 正常返回
          result.data = isDefault ? (item.default || '' ) : item
        }
      } else {
        // 返回不需要进行编辑的类型
        if (key === '_id') {
          // 转化处理格式 _id
          result.data = isDefault ? (item.default || '' ) : item
          result.key = 'id'
        } else {
          result.data = isDefault ? (item.default || '' ) : item
        }
      }
    }
    return result
  }
  // 返回格式化的数据
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
  getDbFormatData: getDbFormatData,
  getResFormat: getResFormat,
};
