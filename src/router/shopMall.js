// 商城


import applyShop from '../page/shopMall/applyShop.vue';    //申请店铺
import shoplist from '../page/shopMall/shoplist.vue';    //首页
import addGoods from '../page/shopMall/addGoods.vue';    //添加商品
import shopOrder from '../page/shopMall/shopOrder.vue';    //店铺订单
import shopOrderDetail from '../page/shopMall/shopOrderDetail.vue';    //店铺订单详情

import myorder from '../page/shopMall/myorder.vue';    //我的订单
import modifyShopname from '../page/shopMall/modifyShopname.vue';    //修改店铺名称

import goodsHome from '../page/shopMall/goodsHome.vue';    //商城


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
    },{
        path: '/shopOrderDetail',
        component: shopOrderDetail,
        name: 'shopOrderDetail'
    },{
        path: '/myorder',
        component: myorder,
        name: 'myorder'
    },{
        path: '/modifyShopname',
        component: modifyShopname,
        name: 'modifyShopname'
    },{
        path: '/goodsHome',
        component: goodsHome,
        name: 'goodsHome'
    },
]