// 资产管理

import assets from '../page/manageAssets/assets.vue';    
import turnOut from '../page/manageAssets/turnOut.vue';             //转出
import turnIn from '../page/manageAssets/turnIn.vue';               //转入 
import turnOutmes from '../page/manageAssets/turnOutmes.vue';       //转出信息  
import turnOutlog from '../page/manageAssets/turnOutlog.vue';       //转出记录  
import balanceBuy from '../page/manageAssets/balanceBuy.vue';       //首页买入 
import buyList from '../page/manageAssets/buyList.vue';             //买入列表
import sellList from '../page/manageAssets/sellList.vue';           //卖出列表
import buyCenter from '../page/manageAssets/buyCenter.vue';         //买入中心
import sellCenter from '../page/manageAssets/sellCenter.vue';       //买出中心
import uploadImg from '../page/manageAssets/uploadImg.vue';         //上传打款截图页面
import translateIntegral from '../page/manageAssets/translateIntegral.vue';   //余额兑换积分


import sweepCode from '../page/manageAssets/sweepCode.vue';   //扫码  


export default [
    {
        path: '/assets',
        component: assets,
        name: 'assets'
    },{
        path: '/turnOut',
        component: turnOut,
        name: 'turnOut'
    },{
        path: '/turnIn',
        component: turnIn,
        name: 'turnIn'
    },{
        path: '/turnOutmes',
        component: turnOutmes,
        name: 'turnOutmes'
    },{
        path: '/turnOutlog',
        component: turnOutlog,
        name: 'turnOutlog'
    },{
        path: '/balanceBuy',
        component: balanceBuy,
        name: 'balanceBuy'
    },{
        path: '/buyList',
        component: buyList,
        name: 'buyList'
    },{
        path: '/sellList',
        component: sellList,
        name: 'sellList'
    },{
        path: '/buyCenter',
        component: buyCenter,
        name: 'buyCenter'
    },{
        path: '/sellCenter',
        component: sellCenter,
        name: 'sellCenter'
    },{
        path: '/translateIntegral',
        component: translateIntegral,
        name: 'translateIntegral'
    },{
        path: '/uploadImg',
        component: uploadImg,
        name: 'uploadImg'
    },
    
    
    
    
    
    {
        path: '/sweepCode',
        component: sweepCode,
        name: 'sweepCode'
    },
]