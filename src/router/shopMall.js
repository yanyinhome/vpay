// 商城


import applyShop from '../page/shopMall/applyShop.vue';    //申请店铺
import shoplist from '../page/shopMall/shoplist.vue';    //首页


export default [
    {
        path: '/applyShop',
        component: applyShop,
        name: 'applyShop'
    },{
        path: '/shoplist',
        component: shoplist,
        name: 'shoplist'
    },
]