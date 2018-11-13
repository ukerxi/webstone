/**
 *  @name route-views-home
 * */
const request = require('../../core/request');
const View = require('../../core/views')
const routeList = [];
routeList.push({
    method: 'get',
    path: '/',
    handler: function (req, res, next) {
        res.locals.section = 'home';
        res.locals.data = {
            banner_list: [],
            news_list: [],
        };
        const view = new View(req, res, next);
        view.on('init', function (next) {
            request.post('/index.php/activities/banner', {
                city: '深圳市',
                show_type: 9,
            }, function (result) {
                res.locals.data.banner_list = result.data;
                next();
            });
        });
        view.on('init', function (next) {
            request.post('/index.php/official/news/get_list', {
                page: 1,
            }, function (result) {
                res.locals.data.news_list = result.data.list;
                next();
            });
        });
        view.render('index');
    },
});

module.exports = routeList;
