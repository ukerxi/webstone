/**
 *  @name route-views-home
 * */
const request = require('../../core/request');
const routeList = [];
routeList.push({
    method: 'get',
    path: '/ee',
    handler: async function(ctx, next) {
        ctx.locals.section = 'home';
        ctx.locals.data = {
            banner_list: [],
            news_list: [],
        };
        await request.post('/index.php/activities/banner', {
            city: '深圳市',
            show_type: 9,
        }, async function (result) {
            ctx.locals.data.banner_list = result.data;
            await next();
        });
    },
});
routeList.push({
    method: 'get',
    path: '/reee',
    handler: async function(ctx, next) {
        request.post('/index.php/official/news/get_list', {
            page: 1,
        }, function (result) {
            ctx.locals.data.news_list = result.data.list;
            next();
        });
    },
});

routeList.push({
    method: 'get',
    path: '/',
    handler: [
        async function(ctx, next) {
            ctx.locals.section = 'home';
            ctx.locals.data = {
                banner_list: [],
                news_list: [],
            };
            await request.post('/index.php/activities/banner', {
                city: '深圳市',
                show_type: 9,
            }, async function (result) {
                ctx.locals.data.banner_list = result.data;
                await next();
            }, {isPromise: true});
        },
        async function(ctx, next) {
            await request.post('/index.php/official/news/get_list', {
                page: 1,
            }, async function (result) {
                ctx.locals.data.news_list = result.data.list;
                await next();
            }, {isPromise: true});
        },
        async function(ctx, next) {
            ctx.locals.test_trrr = 'sfsfsfsf';
            await ctx.render('index', ctx.locals);
            next();
        },
    ],
});

module.exports = routeList;
