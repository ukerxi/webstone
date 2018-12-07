/**
 *  @name routers
 *  @author ukerxi
 *  @description register page route
 * */
const _ = require('lodash');
const common = require('./../core/common.js');
let routeList = [];
// 注册路由
// controllers router
_.forEach(common.registerRoute('/api', 'controllers'), function(item) {
  routeList.push(item);
});

// home page
_.forEach(common.registerRoute('/', 'home'), function(item) {
    routeList.push(item);
});
// admin login page
_.forEach(common.registerRoute('/admin_login', 'admin_login'), function(item) {
    routeList.push(item);
});
// admin login page
_.forEach(common.registerRoute('/add_user', 'add_user'), function(item) {
    routeList.push(item);
});
// template page
_.forEach(common.registerRoute('/post', 'template'), function(item) {
    routeList.push(item);
});

// 导出模块
module.exports = {
    list: routeList,
};

