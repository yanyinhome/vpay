// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/app';
import axios from 'axios';
import Qs from 'qs';
import store from './vuex/store';

// 引入组件
import './assets/js/component';
import './assets/js/compress';
require('animate.css');

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import Mui from 'vue-awesome-mui';
// Vue.use(Mui);

//引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(Mint);
//引入swiper
require('swiper/dist/css/swiper.css');
import VueAwesomeSwiper from 'vue-awesome-swiper';
Vue.use(VueAwesomeSwiper);

// import BScroll from "better-scroll";
// Vue.use(BScroll);

Vue.config.productionTip = false;

// 创建全局eventbus
Vue.prototype.$bus = new Vue();

// 限制跳转
// const Other = ['login', 'register', 'forget'];
// router.beforeEach((to, from, next) => {
//   // 跳转前判断是否登录
//   if (Other.join('*').match(to.fullPath.replace('/', '')) || Other.join('*').match(to.name) !== null) {
//     next();
//   } else {
//     Vue.prototype.axios.post('')
//       .then(({data}) => {
//         // 如果返回值为2000，则跳转到登录页
//         if (data.status === 2000) {
//           router.push('login');
//         } else {
//           next();
//         }
//       }) 
//       .catch(function (error) {
//         console.log(error);
//       });
//   }
// });

// 获取token
Vue.prototype.token = function () {
  if (localStorage.token) {
    var getToken = localStorage.getItem('token');
  }
  return getToken;
};

// 计算当前时间
Vue.prototype.today = function () {
  var time = new Date();
  var m = time.getMonth() + 1;
  var t = time.getFullYear() + "-" + m + "-" + time.getDate() + " " + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
  return t;
};
// 时间前半段
Vue.prototype.nowTime = function () {
  var time = new Date();
  var m = time.getMonth() + 1;
  var t = time.getFullYear() + "-" + m + "-"
  return t;
};

Vue.prototype.$axios = axios;

// 全局过滤器，手机号中间四位隐藏
Vue.filter('hideNum', function (value) {
  if (!value) {
    return;
  }
  return value.replace(/(.*)/, '*');
});

// 全局过滤器，手机号中间四位隐藏
Vue.filter('hideTel', function (value) {
  if (!value) {
    return;
  }
  if (typeof (value) !== 'string') {
    value = value.toString();
  }
  return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
});

// 过滤器，隐藏地址
Vue.filter('hideAddress', function (value) {
  if (!value) {
    return;
  }
  if (typeof value !== "string") {
    value = value.toString();
  }
  return value.slice(0, value.indexOf("市") + 1).concat("****");
});

// 等级
Vue.filter('gradeTo', function (value) {
  if (!value) {
    return;
  }
  if (typeof value !== "string") {
    value = value.toString();
    for (let i = 0; i < value; i++) {
      this.grade.push(1);
    }
  }
  return this.grade;
});

// 全局过滤器，金额只能输入10的倍数
Vue.prototype.moneyCheck = function () {
  if (!this.money) {
    return;
  }
  if (this.money % 10 == 0 || this.money == 0)
    return;
  else {
    this.$bus.$emit('toast', '金额只能输入10的倍数');    
    var i = Math.floor(this.money / 10);
    if ((this.money - i * 10) > 5)
      this.money =  (i + 1) * 10;
    else
    this.money =  i * 10;
  }
};


// axios请求
Vue.prototype.axios = axios.create({
  // baseURL: 'http://swyj.cadhx.com/api/',
  baseURL: 'http://www.3wej.com/api/',
  timeout: 10000,
  withCredentials: false,
  transformRequest: [function (data) {
    data = Qs.stringify(data);
    return data;
  }],
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
