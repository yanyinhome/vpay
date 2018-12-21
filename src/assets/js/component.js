import Vue from 'vue';
// 获取全局组件
// 按钮
import comButton from '../../components/button';
// 头部
import comHead from '../../components/page_head';
// 导航底部
import comFoot from '../../components/page_foot';
import imgFoot from '../../components/img_foot';
// 时间选择器
import comTime from '../../components/time_picker';
// 底部通栏button
import butFoot from '../../components/button_foot';
// 导航栏
import navlist from '../../components/navlist';
// 公告文字轮播
import notice from '../../components/notice';
// 省市县三级联动
import addressSelect from '../../components/addressSelect';

// 挂载全局组件
Vue.component('comButton', comButton);
Vue.component('comHead', comHead);
Vue.component('comFoot', comFoot);
Vue.component('imgFoot', imgFoot);
Vue.component('comTime', comTime);
Vue.component('butFoot', butFoot);
Vue.component('navlist', navlist);
Vue.component('noticeSwiper', notice);
Vue.component('addressSelect', addressSelect);
