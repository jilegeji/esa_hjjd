import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './router/filter'
import store from './store'
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import animated from 'animate.css'
import 'babel-polyfill'
import Promise from 'es6-promise'
Promise.polyfill()

Vue.config.productionTip = false

Vue.use(ViewUI);
Vue.use(animated)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
