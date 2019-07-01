/**
 *  @name webstone
 *  @version 0.1.0
 *  @author ukerxi
 *  @description the entry of the project
* */
const globalConfig = {
  name: 'webstone', // project name
  static_path: 'public', // static file path
  port: 3000,
  env: 'pro', // pro / dev 环境区分
  engine: 'handlebars',
  logger: false, // 是否开启logger
  engine_config: {
    cache: false,
    extname: '.hbs',
    partialsDir: 'templates/views/partials',
    viewsDir: 'templates/views',
    helpersDir: 'templates/views/helpers',
    layoutsDir: 'templates/views/layouts',
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
// 导出配置
module.exports = globalConfig;

// 正式环境直接初始化
let Webstone = '';
if (globalConfig.env === 'pro') {
  Webstone = require('./core/webstone.js');
  // 初始化配置
  Webstone.init(globalConfig);
  // 启动项目
  Webstone.start();
}


