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
      const params = req.body || {};
      // 检验数据
      if (!params.title) {
        resData.code = '1001';
        resData.info = '标题不能为空';
        res.send(resData);
      } else {
        home.add({
          title: params.title,
          notice: params.notice,
          isShow: params.isShow,
          showTime: params.showTime,
          banners: params.banners || [],
          backgroundColor: params.backgroundColor,
          remark: params.remark
        }, function (doc) {
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
    }
});

/**
 * @name update 添加数据
 * */
routeList.push({
    method: 'post',
    path: '/home/update',
    handler: function(req, res, next) {
      const resData = getResFormat();
      const params = req.body || {};
      // 检验数据
      if (!params.id) {
        resData.code = '1001';
        resData.info = 'id不能为空';
        res.send(resData);
      } else {
        home.update(params.id, function (doc) {
          if (doc.status) {
            resData.code = '1001';
            resData.info = '获取数据失败';
          } else {
            resData.info = '更新成功';
            resData.data = doc.data.id || {};
          }
          res.send(resData);
        }, {
          title: params.title,
          notice: params.notice,
          isShow: params.isShow,
          showTime: params.showTime,
          banners: params.banners || [],
          backgroundColor: params.backgroundColor,
          remark: params.remark
        }, false);
      }
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
 * @name getById 查询数据
 * @param id 数据id
 * */
routeList.push({
    method: 'get',
    path: '/home/getOne',
    handler: function(req, res, next) {
      const _isFormat = req.query.isFormat === '1';
      const resData = getResFormat();
      home.getOne({}, function (doc) {
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
