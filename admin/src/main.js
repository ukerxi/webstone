import Vue from 'vue'
import App from './App'
import router from './router'
// 引入 element ui
import ElementUI from 'element-ui'
import './assets/styles/normalize.css';
import './assets/styles/common.less';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
