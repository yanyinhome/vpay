import Vue from 'vue';
import Router from 'vue-router';
// 引入路由
import userCenter from './userCenter';
import shopMall from './shopMall';
import manageAssets from './manageAssets';

Vue.use(Router);

// 路由回顶部
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition;
  } else {
    document.scrollingElement.scrollTop = 0;
  }
};

export default new Router({
  mode: 'history',
  base: '/',
  scrollBehavior,
  routes: [].concat(
    userCenter,
    shopMall,
    manageAssets,
  )
});