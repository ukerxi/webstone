/**
 *  @name route-views-admin-login
 * */
const View = require('../../core/views')
const routeList = [];
routeList.push({
    method: 'get',
    path: '/',
    handler: function (req, res, next) {
        res.locals.eee = 'ewew';
        const view = new View(req, res, next);
        view.render('add_user');
    },
});

module.exports = routeList;
