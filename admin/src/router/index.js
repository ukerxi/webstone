import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  base: '/admin',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: function (resolve) {
        require(['../pages/index.vue'], resolve)
      }
    },
    {
      path: '/index',
      name: 'Index',
      component: function (resolve) {
        require(['../pages/index.vue'], resolve)
      }
    }
  ]
})
