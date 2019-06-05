import Vue from 'vue'
import App from './App.vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import http from './components/http.js'
import ports from './components/ports'

Vue.use(iView);

Vue.prototype.http = http;
Vue.prototype.ports = ports;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
