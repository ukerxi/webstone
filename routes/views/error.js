/**
 *  @name route-views-error
 * */

module.exports = function(err, req, res, next) {
    res.status(500).send(err || '信息出错');
};
