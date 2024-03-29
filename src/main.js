import Vue from 'vue'
import App from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import http from './components/http.js'
import ports from './components/ports'
import router from './components/router'
import store from './components/store.js'
import waterfall from 'vue-waterfall2'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import * as echarts from 'echarts';
import { Calendar } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import solarLunar from 'solarlunar';

import './assets/icon/iconfont.css'
import './assets/css/iview-custom.css'

import CryptoJS from "crypto-js";
import VueMeta from 'vue-meta'


Vue.use(ViewUI);
Vue.prototype.http = http;
Vue.prototype.ports = ports;
Vue.prototype.store = store;
Vue.use(waterfall);
Vue.use(mavonEditor);
Vue.prototype.$echarts = echarts;
Vue.use(Calendar);
Vue.prototype.$solarLunar = solarLunar;
Vue.use(VueMeta);

Vue.prototype.getToken = () => {
  let user = JSON.parse(window.localStorage.getItem('user'));
  if (!!user){
    return user.token;
  }
  return '';
};

Vue.prototype.getBearer = () => {
  let bearer = window.localStorage.getItem('bearer');
  return bearer;;
};

Vue.prototype.isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  return !!flag;
};

Vue.prototype.getDict = (code) => {
  let resultList = [];
  let dictList = store.fetch('noteDict');
  if (!dictList) {
      return resultList;
  }
  for (let i = 0; i < dictList.length; i++) {
    if (dictList[i].code === code) {
      resultList.push(dictList[i]);
    }
  }
  return resultList;
};

Vue.prototype.getDictName = (code, value) => {
  if (value === null || value === undefined) {
    return '--';
  }
  let dictList = store.fetch('noteDict');
  if (!dictList) {
      return '--';
  }
  for (let i = 0; i < dictList.length; i++) {
    if (dictList[i].code === code && dictList[i].value === value) {
      return dictList[i].name;
    }
  }
  return '--';
};

Vue.prototype.proxyImage = (url) => {
  if (!url){
    return "data:image/png;base64,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";
  }
  if (url.indexOf("http://img.nga.178.com") > -1){
    return url;
  }
  if (url.indexOf("http://q.qlogo.cn") > -1){
    return url;
  }
  if (url.indexOf("http://img.ngacn.cc") > -1){
    return url;
  }
  // 去除不安全字符
  if (url.indexOf("|") > -1) {
    url = url.substring(0, url.indexOf("|"))
  }
  return http.serverUrl + "/proxy/file?url="+url;
};

// AES加密
function aesEncrypt(word) {
    if (!word) {
        return word
    }
    let key = CryptoJS.enc.Utf8.parse('notes.xuanss.com');
    let encrypt = CryptoJS.AES.encrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return btoa(encrypt.ciphertext.toString());
}

// AES解密
function aesDecrypt(word) {
  if (!word) {
    return word
  }
  let key = CryptoJS.enc.Utf8.parse('notes.xuanss.com');
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  return decrypt.toString(CryptoJS.enc.Utf8);
}

function aesCipher(word, action) {
    if (action === 'encrypt') {
        return aesEncrypt(word);
    }
    if (action === 'decrypt') {
        return aesDecrypt(word);
    }
}

// 人物信息加解密
Vue.prototype.aesCipherPerson = (item, action) => {
  item.name = aesCipher(item.name, action);
  item.mobileNo = aesCipher(item.mobileNo, action);
  item.idCard = aesCipher(item.idCard, action);
  item.weChatId = aesCipher(item.weChatId, action);
  item.weChatName = aesCipher(item.weChatName, action);
  item.qqId = aesCipher(item.qqId, action);
  item.qqName = aesCipher(item.qqName, action);
  item.hometown = aesCipher(item.hometown, action);
  item.hometownAddress = aesCipher(item.hometownAddress, action);
  item.liveAddress = aesCipher(item.liveAddress, action);
  item.personalEmail = aesCipher(item.personalEmail, action);
  item.workEmail = aesCipher(item.workEmail, action);
  item.avatar = aesCipher(item.avatar, action);
  item.hobbyDescription = aesCipher(item.hobbyDescription, action);
  item.graduatedSchool = aesCipher(item.graduatedSchool, action);
  item.profession = aesCipher(item.profession, action);
  item.professionDescription = aesCipher(item.professionDescription, action);
  item.secondProfession = aesCipher(item.secondProfession, action);
  item.secondProfessionDescription = aesCipher(item.secondProfessionDescription, action);
  return item;
};

Vue.filter('formatDateMMddHHmmss', function (date) {
  return new Date(date).Format('MM-dd HH:mm:ss');
});

Vue.filter('formatDateyyyyMMdd', function (date) {
  return !!date ? new Date(date).Format('yyyy-MM-dd') : undefined;
});

Vue.filter('formatDate', function (date) {
  return new Date(date).Format('yyyy-MM-dd HH:mm:ss');
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
