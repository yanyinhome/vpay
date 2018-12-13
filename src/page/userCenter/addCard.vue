<template>
  <div id="addCard">
    <com-head :opacity="1">添加银行卡</com-head>
    <p>添加银行卡</p>
    <p>请输入支付密码，以验证身份</p>
    <div class="container">
      <div class="item" v-for="i in 6" :key="i">{{numbers[i-1]|hideNum}}</div>
      <input type="password" v-model="numbers" maxlength="6">
    </div>
  </div>
</template>

<script>
export default {
  name: "addCard",
  data() {
    return {
      numbers: "",
      code: []
    };
  },
  watch: {
    numbers(newValue, oldValue) {
      if (newValue.length == 6) {
        this.verification(newValue);
      }
    }
  },
  computed: {},

  created() {},

  mounted() {},
  methods: {
    verification(newValue) {
      console.log(newValue);
      this.axios
        .post("user/beforaddbank", {
          token: this.token(),
          sale_code: newValue
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.$router.push("Cardmes");
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
#addCard {
  background-color: #fff;
  padding-top: 82px;
  text-align: center;
  p:nth-of-type(1) {
    margin-top: 200px;
    font-size: 40px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 56px;
  }
  p:nth-of-type(1) {
    font-size: 40px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
    line-height: 80px;
  }
  .container {
    margin: 100px auto;
    position: relative;
    //   margin: auto;
    height: 88px;
    width: 528px;
    display: flex;
    border: 1px solid #ddd;
  }
  .item {
    flex-basis: 25%;
    font-size: 40px;
    text-align: center;
    line-height: 88px;
  }
  .item:not(:last-of-type) {
    border-right: 1px solid #ddd;
  }
  input {
    position: absolute;
    height: 88px;
    opacity: 0;
    left: 0;
    width: 528px;
    color: red;
  }
}
</style>