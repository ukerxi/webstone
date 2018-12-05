/**
 *  @name route-controllers
 * */
const routeList = [];
const home = require('../../controllers/home');
const getResFormat = require('../../core/common').getResFormat;
routeList.push({
    method: 'get',
    path: '/home/add',
    handler: function(req, res, next) {
      home.add(req.params, function (doc) {
        res.send(getResFormat({info: '添加成功'}));
      });
    },
});
routeList.push({
    method: 'get',
    path: '/home/getById',
    handler: function(req, res, next) {
      const _id = req.query.id || '';
      const resData = getResFormat();
      home.getById(_id, function (doc) {
        if (doc.status) {
          resData.code = '1001';
          resData.info = '获取数据失败';
        } else {
          resData.data = doc.data || {};
        }
        res.send(resData);
      });
    },
});

module.exports = routeList;
