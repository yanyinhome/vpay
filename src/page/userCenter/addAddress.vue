<template>
  <div id="addAddress">
    <com-head :opacity="1">添加地址</com-head>
    <div class="addAddress">
      <div class="box">
        <span>收件人</span>
        <input type="text" v-model="name" placeholder="请输入收件人">
      </div>
      <div class="box">
        <span>手机号码</span>
        <input type="text" v-model="phone" placeholder="请输入手机号码">
      </div>
      <div class="box">
        <span>省份</span>
        <i class="iconfont icon-next"/>
      </div>
      <div class="box">
        <span>城市</span>
        <i class="iconfont icon-next"/>
      </div>
      <div class="box">
        <span>区域</span>
        <i class="iconfont icon-next"/>
      </div>
      <div class="beizhu">
        <textarea style="resize:none" border placeholder="请输入详细地址" v-model="content" rows="5"></textarea>
      </div>
    </div>
    <com-button :click="rewrite">保存</com-button>
  </div>
</template>

<script>
export default {
  name: "addAddress",
  data() {
    return {
      name: "",
      phone: "",
      content: ""
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
#addAddress {
  padding-top: 82px;
  background-color: #f6f6f6;
  .addAddress {
    background-color: #fff;
    .box {
      margin: 0 30px;
      color: #000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1Px solid rgba(0, 0, 0, 0.2);
      line-height: 100px;
      span {
      }
      input {
        width: 540px;
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
    .iconfont {
      color: #ddd;
    }
    .beizhu {
      width: 690px;
      margin-top: 20px;
      margin: 0 auto;
      textarea {
        padding: 20px 0;
        box-sizing: border-box;
      }
    }
  }
}
</style>