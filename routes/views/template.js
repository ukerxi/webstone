/**
 *  @name route-views-template
 * */
const request = require('../../core/request');
const routeList = [];
routeList.push({
    method: 'get',
    path: '/',
    handler: async function(req, res, next) {
        res.send('test post');
    },
});

routeList.push({
    method: 'get',
    path: '/template',
    handler: function(req, res, next) {
        res.render('index', {
            text: '测试发顺丰似睡非睡',
            layout: false,
        });
    },
});

routeList.push({
    method: 'get',
    path: '/333',
    handler: [
        function (req, res, next) {
            res.locals.section = 'home';
            res.locals.data = {
                banner_list: [],
                news_list: [],
            };
            request.post('/index.php/activities/banner', {
                city: '深圳市',
                show_type: 9,
            }, function (result) {
                res.locals.data.banner_list = result.data;
                next();
            });
        },
        function (req, res, next) {
            request.post('/index.php/official/news/get_list', {
                page: 1,
            }, function (result) {
                res.locals.data.news_list = result.data.list;
                next();
            });
        },
        function (req, res, next) {
            res.locals.test_trrr = 'sfsfsfsf';
            res.locals.layout = false;
            res.render('index', res.locals);
        },
    ],
});

module.exports = routeList;
