/**
 *  @name route-controllers
 * */
const routeList = [];
const home = require('../../controllers/home');
const getResFormat = require('../../core/common').getResFormat;
/**
 * @name add 添加数据
 * */
routeList.push({
    method: 'post',
    path: '/home/add',
    handler: function(req, res, next) {
      const resData = getResFormat();
      console.log('params', req.params);
      console.log('body', req.body);
      home.add(req.params, function (doc) {
        if (doc.status) {
          resData.code = '1001';
          resData.info = '获取数据失败';
        } else {
          resData.info = '添加成功';
          resData.data = doc.data.id || {};
        }
        res.send(resData);
      });
    }
});

/**
 * @name getById 查询数据
 * @param id 数据id
 * */
routeList.push({
    method: 'get',
    path: '/home/getById',
    handler: function(req, res, next) {
      const _id = req.query.id || '';
      const _isFormat = req.query.isFormat === '1';
      const resData = getResFormat();
      home.getById(_id, function (doc) {
        if (doc.status) {
          resData.code = '1001';
          resData.info = '获取数据失败';
        } else {
          resData.data = doc.data || {};
        }
        res.send(resData);
      }, _isFormat);
    }
});

/**
 * @name getDataKey 获取默认的数据key
 * */
routeList.push({
    method: 'get',
    path: '/home/getDataKey',
    handler: function(req, res, next) {
      const _isFormat = req.query.isFormat === '1';
      const resData = getResFormat();
      home.getDataKey(function (doc) {
        if (doc.status) {
          resData.code = '1001';
          resData.info = '获取数据失败';
        } else {
          resData.data = doc.data || {};
        }
        res.send(resData);
      }, _isFormat);
    }
});

// export
module.exports = routeList;
