/**
 *  @name route-views-home
 * */
const request = require('../../core/request');
const View = require('../../core/views');
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
                res.locals.data = [];
                next();
            });
        });
        view.render('index');
    },
});

module.exports = routeList;
