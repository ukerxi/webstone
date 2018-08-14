/**
 *  @name route-views-template
 * */
const path = require('path');
const routeList = [];
routeList.push({
    method: 'get',
    path: '/',
    handler: async function(ctx, next) {
        ctx.response.type = 'html';
        ctx.response.body = 'test post';
        next();
    },
});

routeList.push({
    method: 'get',
    path: '/template',
    handler: async function(ctx, next) {
        await ctx.render('index', {
            text: '测试发顺丰似睡非睡',
        });
        next();
    },
});

module.exports = routeList;
