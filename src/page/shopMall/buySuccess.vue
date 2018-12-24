<template>
  <div id="buySuccess">
    <com-head :opacity="1">付款结果</com-head>
    <div class="img">
      <img src="../../assets/image/buysucc.png">
    </div>
    <p>操作成功</p>
    <p>已支付，订单详情请查看“我的订单”。</p>
    <com-button :click="toOrder">查看我的订单</com-button>
    <router-link class="btn" tag="button" to="goodsHome">返回商城首页</router-link>
  </div>
</template>

<script>
export default {
  name: "buySuccess",
  data() {
    return {};
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    toOrder() {
      this.$router.push("myorder");
    }
  }
};
</script>
<style lang='scss' scoped>
#buySuccess {
  padding-top: 82px;
  background-color: #fff;
  text-align: center;
  .img {
    width: 186px;
    height: 186px;
    margin: 100px auto 0;
    img {
      width: 100%;
    }
  }
  p:nth-of-type(1) {
    margin-top: 40px;
    font-size: 40px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 80px;
  }
  p:nth-of-type(2) {
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
    line-height: 60px;
  }
  .btn {
    width: 690px;
    height: 80px;
    background: rgb(218, 217, 217);
    border-radius: 10px;
    margin: 30px auto;
  }
}
</style>