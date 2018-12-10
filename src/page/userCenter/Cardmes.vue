<template>
  <div id="Cardmes">
    <com-head :opacity="1">添加银行卡</com-head>
    <p>请绑定持卡人本人的银行卡</p>
    <div class="message">
      <div class="box">
        <span>开户行</span>
        <input type="text" v-model="name" placeholder="请选择开户行">
        <i class="iconfont icon-next"/>
      </div>
      <div class="box">
        <span>开户支行</span>
        <input type="text" v-model="name" placeholder="如：高新支行">
      </div>
      <div class="box">
        <span>持卡人</span>
        <input type="text" v-model="name" placeholder="请输入持卡人姓名">
      </div>
      <div class="box">
        <span>卡号</span>
        <input type="text" v-model="name" placeholder="请输入银行卡">
      </div>
    </div>

    <div class="moren">
      <i class="iconfont icon-fangkuang"/><i class="iconfont icon-fuxuankuang"/>设置为默认银行卡
    </div>
    <com-button :click="rewrite">添加</com-button>
  </div>
</template>

<script>
export default {
  name: "Cardmes",
  data() {
    return {};
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
#Cardmes {
  background-color: #f6f6f6;
  padding-top: 82px;
  p {
    padding-left: 30px;
    line-height: 90px;
    color: rgba(136, 136, 136, 1);
  }
  .message {
    padding-bottom: 30px;
    background-color: #fff;
    .box {
      padding: 0 30px;
      color: #000;
      display: flex;
      background-color: #fff;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      line-height: 100px;
      input {
        width: 440px;
        text-align: right;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #888;
      }
      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #888;
      }

      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #888;
      }
      input:nth-of-type(2) {
        margin-top: 40px;
      }
      input:nth-of-type(2) {
        margin-top: 40px;
      }
    }
  }

  .iconfont {
    color: #ddd;
  }
  .moren {
    margin-left: 30px;
    line-height: 100px;
    .iconfont {
      color: #979797;
      font-size: 36px;
    }
    .icon-fuxuankuang{
        color: #EACDA3;
        font-size: 32px;
    }
  }
}
</style>