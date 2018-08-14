/**
 *  @name route-views-home
 * */

module.exports = async function(ctx, next) {
    ctx.response.type = 'html';
    ctx.response.body = 'test route view';
    next();
};
