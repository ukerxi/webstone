/**
 *  @version 0.1.0
 *  @description 启动服务器配置
 * */

// 导入工具库
const _ = require('lodash');
const express = require('express');
const viewRoutes = require('../routes/index');
const commonUtils = require('./common');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const middleWare = require('../routes/middleware');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// 实例化
// 定义webstone 类
function Webstone() {
  // default project config
  this._options = {
    name: 'Webstone', // project name
    static_path: 'public', // static file path
    port: 3000,
    env: 'dev', // 'pro'
    engine: 'handlebars',
    logger: true, // logger control
    engine_config: {
      cache: false,
      extname: '.hbs',
      partialsDir: 'templates/views/partials',
      viewsDir: 'templates/views',
      helpersDir: 'templates/views/helpers',
      layoutsDir: 'templates/views/layouts',
      partials: {},
      helpers: {},
    },
    mongo_config: {
      is_connect: true, // 是否开启数据库连接
      url: 'mongodb://localhost:27017/webstone' // 数据库的url
    },
    user_config: {
      // 校验用户配置
      isCheckAdmin: true, // 是否校验后台登录
    }
  };
  this.db = ''; // 数据库对象
}

Webstone.prototype.init = function (configs) {
  // init config data
  let self = this;
  if (_.isObject(configs)) {
    self._options = _.merge(self._options, configs);
  }
  if (self._options.engine_config.helpersDir) {
    self._options.engine_config.helpers = self.getHelpers(self._options.engine_config.helpersDir);
  }
  self.app = express();
  self.router = express.Router();
  return self
};

Webstone.prototype.set = function (key, val) {
  // set config data
  if (key) {
    this._options[key] = val;
  }
};
Webstone.prototype.get = function (key) {
  // set config data
  let _val = null;
  if (key) {
    return this._options[key];
  }
  return _val;
};
Webstone.prototype.log = function () {
  // output log
  const self = this;
  const dashes = '\n------------------------------------------------\n';
  commonUtils.log(dashes
    + 'webstone started: \n'
    + self.get('name') + ' is ready on port ' + self.get('port') + '\n' + dashes);
};

Webstone.prototype.getHelpers = function (filesPath) {
  const _path = path.resolve(__dirname, '../', filesPath, './index.js');
  const Helpers = require(_path);
  return new Helpers();
};

Webstone.prototype.connectDb = function (filesPath) {
  // 连接数据库配置
  const self = this;
  if (self.get('mongo_config').is_connect) {
    self.db = require('../core/db.js');
  }
};

Webstone.prototype.start = function (newApp) {
  // start server
  const self = this;
  let app = newApp || self.app; // 根据传递的使用其他的 express app
  let router = self.router;
  // use static file
  const _static = self.get('static_path');
  // connect db
  self.connectDb();
  // logger
  if (self.get('logger')) {
    app.use(logger());
  }
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());
  app.use(methodOverride());
  // 使用 session
  let sessionConfig = {
    secret: 'webstone cat',
    resave: true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 1000 * 60 * 24 * 5, // 设置 session 的有效时间，单位毫秒
    }
  };
  if (self.db) {
    sessionConfig.store = new MongoStore({mongooseConnection: self.db.connection})
  }
  if (app.get('env') === 'production') {
    app.set('trust proxy', 1); // trust first proxy
    sessionConfig.cookie.secure = true // serve secure cookies
  }
  app.use(session(sessionConfig));
  // 错误处理
  app.use(require('../routes/views/error'));
  // 加载中间件
  app.use(middleWare.initLocals);
  // 加载校验后台登录的验证中间件
  if (self.get('user_config').isCheckAdmin) {
    app.use('/admin*', middleWare.adminUser);
  }
  // 静态文件
  if (_static) {
    if (_.isArray(_static)) {
      _.forEach(_static, function (item) {
        app.use(express.static(path.join(__dirname, '../', item)));
      });
    } else {
      app.use(express.static(path.join(__dirname, '../', _static)));
    }
  }
  // 后台管理的资源文件
  if (self.get('env') === 'pro') {
    app.use(express.static(path.join(__dirname, '../', 'admin/dist')));
  }
  // 初始化引擎，默认使用 bandlebars
  app.enable('view cache'); // 禁用view渲染缓存
  const hbs = exphbs.create({
    defaultLayout: 'default',
    extname: self.get('engine_config').extname,
    helpers: self.get('engine_config').helpers,
    partialsDir: self.get('engine_config').partialsDir,
    layoutsDir: self.get('engine_config').layoutsDir,
  });
  app.engine('.hbs', hbs.engine);
  app.set('views', path.resolve(__dirname, '../', self.get('engine_config').viewsDir));
  app.set('view engine', '.hbs');
  _.forEach(viewRoutes.list, function (item) {
    if (item.path && typeof item.handler !== 'undefined') {
      if (_.indexOf(['get', 'post', 'put', 'del', 'all'], item.method) === -1) {
        item.method = 'get';
      }
      if (_.isArray(item.handler)) {
        router[item.method](item.path, ...item.handler);
      } else {
        router[item.method](item.path, item.handler);
      }
    } else {
      commonUtils.log('error:' + item.path);
    }
  });
  app.use(router);
  if (self.get('env') === 'pro') {
    app.listen(self.get('port'), function () {
      // tips start log
      self.log();
    });
  }
};

// 实例化导出
module.exports = new Webstone();
