/**
 *  @name webstone
 *  @version 0.1.0
 *  @author ukerxi
 *  @description the entry of the project
* */

const webstone = require('./core/index.js');
const Helpers = require('./templates/views/helpers');
// 初始化配置
webstone.init({
    name: 'webstone', // project name
    static_path: 'public', // static file path
    port: 3000,
    env: 'development', // 'production'
    engine: 'handlebars',
    engine_config: {
        map: {hbs: 'handlebars'},
        cache: false,
        extension: 'hbs',
        options: {
            data: {
                test: '测试重配置页传进来的数据',
            },
            layoutsDir: 'templates/views/layouts',
            partialsDir: 'templates/views/partials',
            viewsDir: 'templates/views',
            defaultLayout: 'default',
            helpers: new Helpers(),
        },
    },
});

// 启动项目
webstone.start();
