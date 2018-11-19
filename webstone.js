/**
 *  @name webstone
 *  @version 0.1.0
 *  @author ukerxi
 *  @description the entry of the project
* */

const Webstone = require('./core/webstone.js');
const globalConfig = {
  name: 'webstone', // project name
  static_path: 'public', // static file path
  port: 3000,
  env: 'dev', // pro / dev 环境区分
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
};

// 正式环境直接初始化
if (globalConfig.env === 'pro') {
  // 初始化配置
  Webstone.init(globalConfig);
  // 启动项目
  Webstone.start();
}

// 导出配置
module.exports = globalConfig;


