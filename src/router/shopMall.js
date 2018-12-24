// 商城


import applyShop from '../page/shopMall/applyShop.vue';    //申请店铺
import shoplist from '../page/shopMall/shoplist.vue';    //首页
import addGoods from '../page/shopMall/addGoods.vue';    //添加商品
import shopOrder from '../page/shopMall/shopOrder.vue';    //店铺订单
import shopOrderDetail from '../page/shopMall/shopOrderDetail.vue';    //店铺订单详情

import myorder from '../page/shopMall/myorder.vue';    //我的订单
import modifyShopname from '../page/shopMall/modifyShopname.vue';    //修改店铺名称

import goodsHome from '../page/shopMall/goodsHome.vue';    //商城
import goodsCLassification from '../page/shopMall/goodsCLassification.vue';    //商品分类
import search from '../page/shopMall/search.vue';    //搜索
import searchShop from '../page/shopMall/searchShop.vue';    //搜索店铺结果
import goodDetail from '../page/shopMall/goodDetail.vue';    //商品购买详情
import payment from '../page/shopMall/payment.vue';    //立即支付
import buySuccess from '../page/shopMall/buySuccess.vue';    //购买成功


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
    },{
        path: '/goodsCLassification',
        component: goodsCLassification,
        name: 'goodsCLassification'
    },{
        path: '/search',
        component: search,
        name: 'search'
    },{
        path: '/searchShop',
        component: searchShop,
        name: 'searchShop'
    },{
        path: '/goodDetail',
        component: goodDetail,
        name: 'goodDetail'
    },{
        path: '/payment',
        component: payment,
        name: 'payment'
    },{
        path: '/buySuccess',
        component: buySuccess,
        name: 'buySuccess'
    },
]