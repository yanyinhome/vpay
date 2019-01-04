// 个人信息路由


import index from '../page/index.vue';                                           //首页
import login from '../page/login.vue';                                           //登录，注册                           
import forget from '../page/forget.vue';                                         //忘记密码
import userMessage from '../page/userCenter/userMessage.vue';                    //个人信息
import notice from '../page/userCenter/notice.vue';                              //公告信息
import noticeDetail from '../page/userCenter/noticeDetail.vue';                  //公告信息详情
import rewritePassword from '../page/userCenter/rewritePassword.vue';            //修改密码
import systemSetup from '../page/userCenter/systemSetup.vue';                    //系统设置，修改密码
import myAddress from '../page/userCenter/myAddress.vue';                        //我的地址
import addAddress from '../page/userCenter/addAddress.vue';                      //添加地址

import addCard from '../page/userCenter/addCard.vue';                            //添加银行卡
import myCardlist from '../page/userCenter/myCardlist.vue';                      //我的银行卡
import Cardmes from '../page/userCenter/Cardmes.vue';                            //添加银行卡信息
import Verify from '../page/userCenter/Verify.vue';                              //验证手机号
import shareMes from '../page/userCenter/shareMes.vue';                          //个人信息分享


export default [
    {
        path: '/index',
        component: index,
        name: 'index',
        // meta: {keepAlive: false}
    },{
        path: '/',
        component: login,
        name: 'login'
    },{
        path: '/login',
        component: login,
        name: 'login'
    },{
        path: '/forget',
        component: forget,
        name: 'forget'
    },{
        path: '/userMessage',
        component: userMessage,
        name: 'userMessage'
    },{
        path: '/notice',
        component: notice,
        name: 'notice'
    },{
        path: '/noticeDetail',
        component: noticeDetail,
        name: 'noticeDetail'
    },{
        path: '/rewritePassword',
        component: rewritePassword,
        name: 'rewritePassword'
    },{
        path: '/systemSetup',
        component: systemSetup,
        name: 'systemSetup'
    },{
        path: '/myAddress',
        component: myAddress,
        name: 'myAddress'
    },{
        path: '/addAddress',
        component: addAddress,
        name: 'addAddress'
    },{
        path: '/addCard',
        component: addCard,
        name: 'addCard'
    },{
        path: '/myCardlist',
        component: myCardlist,
        name: 'myCardlist'
    },{
        path: '/Cardmes',
        component: Cardmes,
        name: 'Cardmes'
    },{
        path: '/Verify',
        component: Verify,
        name: 'Verify'
    },{
        path: '/shareMes',
        component: shareMes,
        name: 'shareMes'
    },
]