/**
 *  @name route-views-admin-login
 * */
const View = require('../../core/views')
const routeList = [];
routeList.push({
    method: 'get',
    path: '/',
    handler: function (req, res, next) {
        res.locals.section = 'home';
        res.locals.data = {
           text: req.session.user || 'reee'
        };
        const view = new View(req, res, next);
        view.render('admin_login');
    },
});

module.exports = routeList;
