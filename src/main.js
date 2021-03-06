import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
// 引入
import router from './router/index'
// 引入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
