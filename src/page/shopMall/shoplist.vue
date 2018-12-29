<template>
  <div id="shoplist">
    <com-head :opacity="2"></com-head>
    <router-link tag="div" :to="{name: 'shopOrder',query: {status: '0'}}" class="keepdata">订单管理</router-link>
    <div class="shopMes">
      <div class="upload" @click="portrait">
        <div class="yulan" v-if="yulan">
          <img :src="yulan">
        </div>
        <input
          class="imginp"
          ref="portrait"
          name="imgurl"
          id="imgurl"
          type="file"
          accept="image/*"
          @change="shangchuan"
        >
      </div>
      <p>
        {{shop.shop_name}}
        <router-link  class="iconfont icon-bianji" tag="span" :to="{name:'modifyShopname',query:{id: shop.id}}"></router-link>
      </p>
      <p>开铺时间：{{shop.create_time}}</p>
      <div class="number">
        <div class="box">
          <p>浏览人数</p>
          <p>{{shop.view}}</p>
        </div>|
        <div class="box">
          <p>今日收益</p>
          <p>{{today}}</p>
        </div>|
        <div class="box">
          <p>总收益</p>
          <p>{{total}}</p>
        </div>
      </div>
      <div class="nav">
        <div class="box">
          <span class="navzi">待发货</span>
          <span class="navshu">{{fahuo}}</span>
        </div>
        <div class="box"><span class="navzi">已完成</span><span class="navshu">{{wancheng}}</span></div>
      </div>
    </div>
  
    <div class="goodslist" v-if="!listshow">
      <div class="item" v-for="(item,index) in message" :key="item.id">
        <div class="img"><img :src="item.img" alt=""></div>
        <div class="goodsmes">
          <p>{{item.shop_name}}</p>
          <p>
            售价：
            <span>&yen;{{item.price}}</span>
          </p>
          <p>
            <span>库存：{{item.stock}}</span>
            <span>销量：{{item.sale_num}}</span>
            <i @click="goodHandel(item.id,index,item.is_top)" class="iconfont icon-gengduo"/>
          </p>
        </div>
      </div>
      <div v-if="!message.length" style="margin-top: 15vh; text-align: center;">暂无商品信息</div>
    </div>
     
    <router-link tag="div" to="addGoods" class="addgoods"><img src="../../assets/image/addgoods.png"></router-link>
    <!-- 更多 -->
    <div class="morenav" v-if="navhandel" @click="navhandel=false">
      <div class="page_foot_inner">
        <div class="page_foot_nav" @click="delectGood">
          <div> <i class="iconfont icon-iconfont-shanchu"/></div>
          <p class="page_foot_name">删除</p>
        </div>
        <div  class="page_foot_nav" @click="rewriteGood">
          <div> <i class="iconfont icon-bianji"/></div>
          <p class="page_foot_name">编辑</p>
        </div>
        <div class="page_foot_nav"  @click="topGood">
          <div> <i class="iconfont icon-zhiding"/></div>
          <p class="page_foot_name">{{istopzi}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shoplist",
  data() {
    return {
      listshow: false,
      navhandel: false,
      yulan: "",
      picValue: "",
      imgbase: [],
      name: "",
      time: "",
      message: [],
      shop:{},
      today: '',
      total: '',
      wancheng: '',
      fahuo: '',
      goodid: '',
      goodindex: '',
      istop: '',
      istopzi: '',
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading(){
      this.axios
        .post("/shop/my_shop", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.shop = data.data.shop;
            this.yulan = data.data.shop.img;
            this.today = data.data.today;
            this.total = data.data.total;
            this.fahuo = data.data.fahuo;
            this.wancheng = data.data.wancheng;
            this.message = data.data.goods;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    goodHandel(id,index,istop){
      istop =='1'? this.istopzi='取消置顶':this.istopzi='置顶';
      this.goodid = id;
      this.goodindex = index;
      this.istop = istop;
      this.navhandel = true;
    },
    // 删除
    delectGood(){
      this.axios
        .post("/shop/del_goods", {
          token: this.token(),
          id: this.goodid
        })
        .then(({ data }) => {
          console.log(data);
          this.navhandel = false;
          if (data.code === "200") {
            this.message.splice(this.goodindex,1);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 编辑
    rewriteGood(){

    },
    // 置顶,取消
    topGood(){
      if (this.istop == '1') {
        // 取消
        this.axios
        .post("/shop/cancel_top", {
          token: this.token(),
          id: this.goodid
        })
        .then(({ data }) => {
          console.log(data);
          this.navhandel = false;
          if (data.code === "200") {
            this.$router.go(0);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      } else if (this.istop == '2') {
        // 置顶
        this.axios
        .post("/shop/is_top", {
          token: this.token(),
          id: this.goodid
        })
        .then(({ data }) => {
          console.log(data);
          this.navhandel = false;
          if (data.code === "200") {
            this.$router.go(0);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      
    },
    // 头像单击事件
    portrait() {
      this.$refs.portrait.click(); // 获取ref为portrait的元素相当于获取id为portrait的元素
    },
    shangchuan(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue,'0');
      setTimeout(() => {
        this.uploadImg();
      }, 100); 
    },
    // 上传图片请求
    uploadImg(){
      this.axios
        .post("/shop/upshop_img", {
          token: this.token(),
          id: this.shop.id,
          img: this.imgbase[0]
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$bus.$emit("toast", data.msg);            
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>
<style lang='scss' scoped>
#shoplist {
  background-color: #f6f6f6;
  color: #fff;
  .keepdata {
    width: 160px;
    height: 80px;
    text-align: center;
    color: #fff;
    line-height: 80px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }
  .shopMes {
    width: 750px;
    height: 560px;
    background: url("../../assets/image/loginbg.png");
    background-size: 100%;
    text-align: center;
    padding-top: 82px;
    box-sizing: border-box;
    position: relative;
    .upload {
      width: 100px;
      height: 100px;
      margin: auto;
      border-radius: 50px;
      overflow: hidden;
      border: 1Px dashed rgba(153, 153, 153, 1);
      .yulan {
        width: 100px;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
      input {
        width: 10px;
        opacity: 0;
        filter: alpha(opacity=0);
      }
    }
    p:nth-of-type(1) {
      margin-top: 20px;
      font-size: 30px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 40px;
      .icon-bianji {
        font-size: 30px;
        color: #bbbbbb;
      }
    }
    p:nth-of-type(2) {
      margin-top: 10px;
      font-size: 24px;
      color: #fff;
      line-height: 40px;
    }
    .number {
      margin-top: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      .box {
        width: 250px;
      }
      p:nth-of-type(1) {
        font-size: 28px;
      }
      p:nth-of-type(2) {
        font-size: 32px;
        font-weight: 500;
      }
    }
    .nav {
      width: 690px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.2);
      border-radius: 51px;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 50%);
      .box {
        display: inline-block;
        width: 49%;
        line-height: 100px;
        font-size: 30px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
        .navshu {
          display: inline-block;
          margin-left: 10px;
          width: 42px;
          height: 42px;
          border-radius: 21px;
          background: rgba(214, 174, 123, 1);
          color: #fff;
          line-height: 42px;
          font-size: 24px;
        }
        .navzi {
          padding: 5px;
        }
        .active {
          border-bottom: 2Px solid rgba(214, 174, 123, 1);
        }
      }
    }
  }
  .goodslist {
    margin-top: 60px;
    color: #000;
    .item {
      margin: 0 30px;
      padding: 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1Px solid #cbcbcb;
      .img {
        width: 130px;
        height: 130px;
        background: rgba(216, 216, 216, 1);
        border-radius: 6px;
      }
      .goodsmes {
        width: 540px;
        color: rgba(102, 102, 102, 1);
        p:nth-of-type(1) {
          font-size: 30px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          color: rgba(0, 0, 0, 1);
          line-height: 50px;
        }
        p:nth-of-type(2) {
          font-size: 26px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          line-height: 40px;
          span {
            color: #f10f0f;
          }
        }
        p:nth-of-type(3) {
          font-size: 26px;
          font-family: PingFangSC-Medium;
          font-weight: 500;
          line-height: 40px;
          span {
            display: inline-block;
            width: 44%;
          }
          .icon-gengduo {
            font-size: 42px;
            color: #d6ae7b;
          }
        }
      }
    }
  }
  .addgoods {
    width:130px;
    height:130px;
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    img {
      width: 100%;
    }
  }
  .morenav {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background: rgba(15, 15, 15,0.2);
    top: 0vh;
    left: 50%;
    width: 750px;
    margin-left: -375px;
    z-index: 99;
    .page_foot_inner {
      position: fixed;
      bottom: 196px;
      left: 0;
      width: 100%;
      height: 110px;
      background: #888;
      z-index: 100;
      .page_foot_nav {
        margin-top: 16px;
        width: 250px;
        float: left;
        text-align: center;
        color: #fff;
        font-size: 24px;
        line-height: 40px;
        .iconfont{
          font-size: 40px;
        }
      }
    }
  }
}
</style>