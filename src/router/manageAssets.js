// 资产管理

import assets from '../page/manageAssets/assets.vue';    
import turnOut from '../page/manageAssets/turnOut.vue';   //转出
import turnIn from '../page/manageAssets/turnIn.vue';     //转入 
import turnOutmes from '../page/manageAssets/turnOutmes.vue';   //转出信息  
import turnOutlog from '../page/manageAssets/turnOutlog.vue';   //转出记录  


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
    },
    
    
    
    
    
    {
        path: '/sweepCode',
        component: sweepCode,
        name: 'sweepCode'
    },
]