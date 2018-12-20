// 商城


import applyShop from '../page/shopMall/applyShop.vue';    //申请店铺
import shoplist from '../page/shopMall/shoplist.vue';    //首页
import addGoods from '../page/shopMall/addGoods.vue';    //添加商品
import shopOrder from '../page/shopMall/shopOrder.vue';    //商品订单


export default [
    {
        path: '/applyShop',
        component: applyShop,
        name: 'applyShop'
    },{
        path: '/shoplist',
        component: shoplist,
        name: 'shoplist'
    },{
        path: '/addGoods',
        component: addGoods,
        name: 'addGoods'
    },{
        path: '/shopOrder',
        component: shopOrder,
        name: 'shopOrder'
    },
]