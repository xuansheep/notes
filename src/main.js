import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './components/http.js'
import ports from './components/ports'
import router from './components/router'
import store from './components/store.js'

import './assets/icon/iconfont.css'

Vue.use(iView);

Vue.prototype.http = http;
Vue.prototype.ports = ports;
Vue.prototype.store = store;

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
