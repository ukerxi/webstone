/**
 *  @name route-views-admin-login
 * */
const View = require('../../core/views')
const routeList = [];
routeList.push({
    method: 'get',
    path: '/',
    handler: function (req, res, next) {
        res.locals.section = 'login_admin';
        res.locals.data = {
           text: 'test'
        };
        const view = new View(req, res, next);
        view.render('login_admin');
    },
});

module.exports = routeList;
