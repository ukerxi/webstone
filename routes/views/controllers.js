/**
 *  @name route-controllers
 * */
const routeList = [];
const home = require('../../controllers/home')
routeList.push({
    method: 'get',
    path: '/home/add',
    handler: function(req, res, next) {
      home.add(req.params, function (doc) {
        res.send('添加数据成功');
      });
    },
});
routeList.push({
    method: 'get',
    path: '/home/getById',
    handler: function(req, res, next) {
      const _id = req.query.id || '';
      home.getById(_id, function (doc) {
        res.send(doc.data);
      });
    },
});

module.exports = routeList;
