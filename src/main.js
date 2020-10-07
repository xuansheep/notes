import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import http from './components/http.js'
import ports from './components/ports'
import router from './components/router'
import store from './components/store.js'

import './assets/icon/iconfont.css'

Vue.use(ViewUI);

Vue.prototype.http = http;
Vue.prototype.ports = ports;
Vue.prototype.store = store;

Vue.prototype.isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  return !!flag;
};

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
