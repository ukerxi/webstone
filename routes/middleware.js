// 初始化页面数据
module.exports = {
  initLocals: function (req, res, next) {
    const accept = req.header('Accept');
    res.locals = {};
    // 添加针对时候
    if (accept.indexOf('text/html') !== -1) {
      // 对于页面进行添加公用的数据初始化
      res.locals = {};
      res.locals.name = 'Webstone';
    }
    next();
  },
  adminUser: function (req, res, next) {
    const accept = req.header('Accept');
    // 后台登录校验
    if (accept.indexOf('text/html') !== -1) {
      // 对于后天页面进行用户权限过滤
      if (req.session.user_name) {
        next();
      } else {
        res.redirect(301, '/login_admin.html')
      }
    } else {
      next();
    }
  },
};
