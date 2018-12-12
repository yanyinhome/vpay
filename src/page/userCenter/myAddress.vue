<template>
  <div id="myAddress">
    <com-head :opacity="1">我的地址</com-head>
    <div class="address">
      <div class="box1">
        <p>
          <span>{{name}}</span>&emsp;
          <span>{{phone}}</span>
        </p>
        <p>{{address}}</p>
      </div>
      <div class="box2">
        <div class="left">
          <i class="iconfont icon-fangkuang"/>
          <i class="iconfont icon-fuxuankuang"/>
          <span>设为默认</span>
        </div>
        <div class="right">
          <div>
            <i class="iconfont icon-icon_edit"/>
            <span>修改</span>
          </div>
          <div>
            <i class="iconfont icon-iconfont-shanchu"/>
            <span>删除</span>
          </div>
        </div>
      </div>
    </div>
    <butFoot :click="addAddress"><i class="iconfont icon-add"/>添加新地址</butFoot>
  </div>
</template>

<script>
export default {
  name: "myAddress",
  data() {
    return {
      name: "陈女士",
      phone: "17839888888",
      address: "棉纺西路"
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    addAddress(){
      this.$router.push('addAddress');
    }
  }
};
</script>
<style lang='scss' scoped>
#myAddress {
  padding-top: 72px;
  background-color: #f6f6f6;
  .address {
    background-color: #fff;
    .box1 {
      margin: 10px 30px;
      padding: 10px 0;
      border-bottom: 1Px solid rgba(0, 0, 0, 0.1);
      p:nth-of-type(1) {
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(3, 3, 3, 1);
        line-height: 60px;
      }
      p:nth-of-type(2) {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        line-height: 60px;
      }
    }
    .box2 {
      margin: 0 30px;
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      color: rgba(153, 153, 153, 1);
      .left {
        display: flex;
        align-items: center;
      }
      .right {
        width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .iconfont {
        font-size: 40px;
        // line-height: 80px;
      }
      .icon-fuxuankuang {
          color: #D6AF7C;
          font-size: 36px;
      }
    }
  }
}
</style>