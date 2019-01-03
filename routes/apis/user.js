/**
 *  @name route-controllers
 * */
const routeList = [];
const user = require('../../controllers/user');
const getResFormat = require('../../core/common').getResFormat;
/**
 * @name add 添加数据
 * @param account 账号
 * @param password 账户密码
 * @param remark 账户备注
 * @param type 账户权限
 * */
routeList.push({
  method: 'post',
  path: '/user/add',
  handler: function (req, res, next) {
    const resData = getResFormat();
    const params = req.body || {};
    let options = {};
    if (!params.account || !params.password) {
      resData.code = '1002';
      resData.info = '账户或密码为空';
      res.send(resData);
    } else {
      options.account = params.account;
      options.password = params.password;
      user.add(options, function (doc) {
        if (doc.status) {
          resData.code = '1001';
          resData.info = '注册失败';
        } else {
          resData.info = '注册成功';
          resData.data = {};
        }
        res.send(resData);
      });
    }
  }
});

/**
 * @name login 登录
 * @param account 账号
 * @param password 账户密码
 * */
routeList.push({
  method: 'post',
  path: '/user/login',
  handler: function (req, res, next) {
    const resData = getResFormat();
    const params = req.body || {};
    // 检验数据
    if (!params.account || !params.password) {
      resData.code = '1001';
      resData.info = '账户或密码为空';
      res.send(resData);
    } else {
      user.getByParam({
        // 查询条件
        account: params.account
      }, function (doc) {
        let _user = '';
        if (doc.status) {
          resData.code = '1002';
          resData.info = '账户未注册';
        } else {
          doc.data.forEach(function (item) {
            // 判断用户
            if (item.password === params.password) {
              _user = item
            }
          });
          if (_user) {
            req.session.user_name = _user.account;
            req.session.user_id = _user.id;
            resData.info = '登录成功';
          } else {
            resData.code = '1001';
            resData.info = '密码错误';
          }
        }
        res.send(resData);
      });
    }
  }
});

/**
 * @name logout 登出
 * @param account 账号
 * */
routeList.push({
  method: 'post',
  path: '/user/logout',
  handler: function (req, res, next) {
    const resData = getResFormat();
    const params = req.body || {};
    // 检验数据
    if (!params.account) {
      resData.code = '1001';
      resData.info = '登出失败';
    } else if (params.account !== req.session.user_name) {
      resData.code = '1001';
      resData.info = '登出账户与当前账户不一致';
    } else {
      req.session.user_name = '';
      req.session.user_id = '';
      resData.code = '0000';
      resData.info = '登出成功';
    }
    res.send(resData);
  }
});

/**
 * @name getById 查询
 * @param account 账号
 * @param password 账户密码
 * */
routeList.push({
  method: 'get',
  path: '/user/getById',
  handler: function (req, res, next) {
    const _id = req.query.id || '';
    const _isFormat = req.query.isFormat === '1';
    const resData = getResFormat();
    user.getById(_id, function (doc) {
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
 * @name update 更新
 * @param account 账号
 * @param password 账户密码
 * */
routeList.push({
  method: 'post',
  path: '/user/update',
  handler: function (req, res, next) {
    const _params = req.params || {};
    const _id = _params.id || '';
    const _isFormat = _params.isFormat === '1';
    const resData = getResFormat();
    let _options = {}; // 更新的属性
    if (_params.password) {
      _options.password = _params.password || ''
    }
    if (!_options.password) {
      // 检验数据
      resData.code = '1001';
      resData.info = '密码为空';
      res.send(resData);
    } else {
      user.update(_id, function (doc) {
        if (doc.status) {
          resData.code = '1001';
          resData.info = '修改密码失败';
        } else {
          resData.data = doc.data || {};
        }
        res.send(resData);
      }, _options, _isFormat);
    }
  }
});

module.exports = routeList;
