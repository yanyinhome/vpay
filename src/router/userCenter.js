// 个人信息路由


import index from '../page/index.vue';    //首页
import login from '../page/login.vue';    //登录
import register from '../page/register.vue';    //注册
import forget from '../page/forget.vue';    //忘记密码
import userMessage from '../page/userCenter/userMessage.vue';    //个人信息


export default [
    {
        path: '/index',
        component: index,
        name: 'index'
    },{
        path: '/',
        component: login,
        name: 'login'
    },{
        path: '/login',
        component: login,
        name: 'login'
    },{
        path: '/register',
        component: register,
        name: 'register'
    },{
        path: '/forget',
        component: forget,
        name: 'forget'
    },{
        path: '/userMessage',
        component: userMessage,
        name: 'userMessage'
    },
]