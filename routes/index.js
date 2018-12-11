/**
 *  @name routers
 *  @author ukerxi
 *  @description register page route
 * */
const _ = require('lodash');
const glob = require('glob');
const path = require('path');
const common = require('./../core/common.js');
let routeList = [];
// 注册路由
// api controllers router
glob.sync(path.resolve(__dirname, './apis/') + '/*.js').forEach(function (item) {
  let name = item.split('apis/')[1].replace('.js', '');
  _.forEach(common.registerRoute('/api', name, 'apis'), function(item) {
    routeList.push(item);
  });
});

// home page
_.forEach(common.registerRoute('/', 'home', 'views'), function(item) {
    routeList.push(item);
});
// admin login page
_.forEach(common.registerRoute('/login_admin', 'login_admin', 'views'), function(item) {
    routeList.push(item);
});
// admin add_user
_.forEach(common.registerRoute('/add_user', 'add_user', 'views'), function(item) {
    routeList.push(item);
});


// 导出模块
module.exports = {
    list: routeList,
};

