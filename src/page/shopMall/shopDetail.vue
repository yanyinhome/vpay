<template>
  <div id="searchShop">
    <com-head :opacity="0"></com-head>
    <div class="iteminp">
      <span>
        <i class="iconfont icon-sousuo"></i>
      </span>
      <input type="text" v-model="search" placeholder="请输入你想要搜索的物品或商家" autofocus="autofocus">
    </div>
    <div class="user">
      <router-link class="boxmes" tag="div" to="shoplist">
        <div class="left">
          <img src="../../assets/image/card1.png">
        </div>
        <div class="right">
          <p>{{name}}</p>
          <p>申请时间：</p>
        </div>
      </router-link>
      <div class="right2">
        <p>店铺商品</p>
        <p>339件</p>
      </div>
    </div>
    <div class="goods">
      <div class="item">
        <div class="img">
          <img src>
        </div>
        <div class="detail">
          <p>少油烟锅具套装</p>
          <p>七件套：欧式精铸炒锅+ Carat钻石汤锅+Carat钻石</p>
          <p>
            <span>&yen;599</span>
            <span class="iconfont icon-gouwuche"></span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchShop",
  data() {
    return {
      name: ""
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
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
#searchShop {
  width: 750px;
  background-color: #fff;
  padding-top: 82px;
  color: #fff;
  background-image: url("../../assets/image/shopbg1.png");
  background-repeat: no-repeat;
  background-size: 750px 450px;
  .iteminp {
    position: fixed;
    top: 11px;
    left: 84px;
    padding: 0 30px;
    box-sizing: border-box;
    background: #ddd;
    line-height: 60px;
    border-radius: 30px;
    z-index: 100;
    span {
      font-size: 34px;
      color: #999;
    }
    input {
      padding-left: 10px;
      line-height: 60px;
      width: 500px;
      background: none;
      font-size: 26px;
      color: #000;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #888;
      font-size: 28px;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #888;
      font-size: 28px;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #888;
      font-size: 28px;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #888;
      font-size: 28px;
    }
  }
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