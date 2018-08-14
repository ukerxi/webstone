/**
 *  @version 0.1.0
 *  @description 启动服务器配置
 * */

// 导入工具库
const _ = require('lodash');
const Koa = require('koa');
const Router = require('koa-router');
const viewRoutes = require('../routes/index');
const commonUtils = require('./common');
const koaStatic = require('koa-static');
const path = require('path');
const views = require('koa-views');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

// 实例化
const app = new Koa();
const router = new Router();
// 定义webstone 类
function Webstone() {
    // default project config
    this._options = {
        name: 'Webstone', // project name
        static_path: 'public', // static file path
        port: 3000,
        env: 'development', // 'production'
    };
}

Webstone.prototype.init = function(configs) {
    // init config data
    let self = this;
    if (_.isObject(configs)) {
        self._options = _.extend(self._options, configs);
    }
};

Webstone.prototype.set = function(key, val) {
    // set config data
    if (key) {
        this._options[key] = val;
    }
};
Webstone.prototype.get = function(key) {
    // set config data
    let _val = null;
    if (key) {
        return this._options[key];
    }
    return _val;
};
Webstone.prototype.log = function() {
    // output log
    const self = this;
    const dashes = '\n------------------------------------------------\n';
    commonUtils.log(dashes
        + 'webstone started: \n'
        + self.get('name') + ' is ready on port '+ self.get('port') +'\n' + dashes);
};

Webstone.prototype.start = function() {
    // start server
    const self = this;
    // use static file
    const _static = self.get('static_path');
    app.evn = self.get('env');
    // logger
    app.use(logger());
    app.use(bodyParser());
    // 错误处理
    app.use(require('../routes/views/error'));
    // 初始化引擎，默认使用 bandlebars
    if (self.get('engine') === 'handlebars') {
        app.use(views(path.join(__dirname, '../templates/views'), self.get('engine_config')));
    }
    _.forEach(viewRoutes.list, function(item) {
        if (item.path && typeof item.handler === 'function') {
            if (_.indexOf(['get', 'post', 'put', 'del', 'all'], item.method) !== -1) {
                router[item.method](item.path, item.handler);
            } else {
                router.get(item.path, item.handler);
            }
        } else {
            commonUtils.log('error:' + item.path);
        }
    });
    app.use(router.routes());
    app.use(router.allowedMethods());

    if (_static) {
        if (_.isArray(_static)) {
            _.forEach(_static, function(item) {
                app.use(koaStatic(path.join(__dirname, '../', item)));
            });
        } else {
            app.use(koaStatic(path.join(__dirname, '../', _static)));
        }
    }
    app.listen(self.get('port'), function() {
        // tips start log
        self.log();
    });
};

module.exports = new Webstone();
