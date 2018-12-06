// 初始化页面数据
module.exports = {
    initLocals: function (req, res, next) {
        res.locals = {};
        res.locals.navLinks = [
            {label: '首页', key: 'home', href: '/'},
            {label: '企业用车', key: 'rent', href: '/rent'},
            {label: '企业班车', key: 'shuttle', href: '/shuttle'},
            {label: 'SAAS系统', key: '', href: ''},
            {label: '合作案例', key: 'case', href: '/case'},
            {label: '车队加盟', key: '', href: ''},
        ];
        res.locals.navSecondLinks = [
            {label: '公司介绍', key: 'introduction', href: '/introduction'},
            {label: '新闻动态', key: 'news', href: '/news'},
            {label: '加入我们', key: 'join', href: '/join'},
            {label: '巴士营销', key: 'ad', href: '/ad'},
            {label: '帮助中心', key: 'help', href: '/help'},
        ];
        next();
    },
    adminUser: function (req, res, next) {
      // 后台登录校验
       if (req.session.user) {
         next();
       } else {
         next();
       }
    },
};
