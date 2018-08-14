/**
 *  @name routers
 *  @author ukerxi
 *  @description register page route
 * */
const _ = require('lodash');
const path = require('path');
let routeList = [];

// 注册路由
// home page
registerRoute('/', require(getPath('home')));
// template page
registerRoute('/post', require(getPath('template')));


function registerRoute(path, handler) {
    // handle routes
    if (_.isFunction(handler)) {
        routeList.push({
            path: '/',
            handler: handler,
        });
    } else if (_.isArray(handler)) {
        _.forEach(handler, function(item) {
            routeList.push({
                path: item.path === '/' ? path : path + item.path,
                handler: item.handler,
                method: item.method,
            });
        });
    }
}

function getPath(str) {
    // 直接定位到 views 文件夹下
    return path.join(__dirname, './views/', str);
}


// 导出模块
module.exports = {
    list: routeList,
};

