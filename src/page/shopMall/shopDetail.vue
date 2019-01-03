<template>
  <div id="shopDetail">
    <com-head :opacity="0">{{shop.shop_name}}</com-head>
    <div class="user">
      <div class="boxmes">
        <div class="left">
          <img :src="shop.img">
        </div>
        <div class="right">
          <p>{{shop.shop_name}}</p>
          <p>申请时间：{{shop.create_time}}</p>
        </div>
      </div>
      <div class="right2">
        <p>店铺商品</p>
        <p>{{count}}件</p>
      </div>
    </div>
    <div class="goods">
      <div class="item" v-for="item in goods" :key="item.id">
        <div class="img"  @click="toGooddetail(item.id)">
          <img :src="item.imgurl">
        </div>
        <div class="detail">
          <p>{{item.name}}</p>
          <p>{{item.content}}</p>
          <p @click="toGoodpay(item.id)">
            <span>&yen;{{item.price}}</span>
            <span class="iconfont icon-gouwuche"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopDetail",
  data() {
    return {
      count: "",
      search: '',
      shop: {},
      goods: [],
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading() {
      this.axios
        .post("/shop/shop_goods", {
          token: this.token(),
          id: this.$route.query.shopid
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.count = data.data.count;
            this.shop = data.data.shop;
            this.goods = data.data.goods;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toGooddetail(id){
      this.$router.push({name:'goodDetail',query: {id: id}});
    },
    toGoodpay(id){
      this.$router.push({name:'payment',query: {id: id}});
    },
  }
};
</script>
<style lang='scss' scoped>
#shopDetail {
  width: 750px;
  background-color: #fff;
  padding-top: 82px;
  color: #fff;
  background-image: url("../../assets/image/shopbg1.png");
  background-repeat: no-repeat;
  background-size: 750px 450px;
  .user {
    padding: 10px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: #14171a;

    .boxmes {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        margin-right: 20px;
        width: 120px;
        height: 120px;
        border-radius: 2px;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .right p {
        font-size: 30px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 50px;
      }
      .right p:nth-of-type(2) {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 50px;
      }
    }
    .right2 {
      width: 212px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      //   border-left: 1Px solid rgba(153, 153, 153, 1);
      text-align: center;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 2px;
        height: 60px;
        background: rgba(153, 153, 153, 1);
      }
      p:nth-of-type(2) {
        color: #d6ae7b;
        line-height: 40px;
      }
    }
  }
  .goods {
    margin: 20px 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      margin-top: 20px;
      width: 334px;
      height: 548px;
      background: rgba(42, 42, 42, 1);
      border-radius: 8px;
      box-shadow: 2px 5px 50px #999;
      overflow: hidden;

      .img {
        width: 334px;
        height: 334px;
        background-color: #fff;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
    .detail {
      margin-top: 5px;
      padding: 0 20px;
      color: #fff;
      p:nth-of-type(1) {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
        line-height: 60px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      p:nth-of-type(2) {
        word-break: break-all;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(176, 176, 176, 1);
        line-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      p:nth-of-type(3) {
        color: #f10f0f;
        line-height: 76px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-of-type(2) {
          color: #fff;
          font-size: 56px;
        }
      }
    }
  }
}
</style>