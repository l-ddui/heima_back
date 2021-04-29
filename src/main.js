import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
// 引入
import router from './router/index'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
