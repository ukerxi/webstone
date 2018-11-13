/**
 *  @name webstone
 *  @version 0.1.0
 *  @author ukerxi
 *  @description the entry of the project
* */

const webstone = require('./core/webstone.js');
// 初始化配置
webstone.init({
    name: 'webstone', // project name
    static_path: 'public', // static file path
    port: 3000,
    env: 'development', // 'production'
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
});

// 启动项目
webstone.start();
