/**
 *  @name route-views-home
 * */
const View = require('../../core/views');
const home = require('../../controllers/home');
const routeList = [];
routeList.push({
  method: 'get',
  path: '/',
  handler: function (req, res, next) {
    res.locals.section = 'home';
    res.locals.data = {};
    const view = new View(req, res, next);
    view.on('init', function (next) {
      home.getOne({}, function (doc) {
        if (!doc.status) {
          res.locals.data = doc.data || {};
          next();
        }
      }, false);
    });
    view.render('index');
  },
});

module.exports = routeList;
