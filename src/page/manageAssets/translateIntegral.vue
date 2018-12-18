<template>
  <div id="translateIntegral">
    <com-head :opacity="0">兑换积分</com-head>
    <!-- 转出 -->
    <div class="money">
      <input type="text" v-model="money" placeholder="请输入兑换数量" @blur="moneyCheck()">
      <input type="password" v-model="password" placeholder="请输入二级密码">
      <com-button :click="submit">确认</com-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "translateIntegral",
  data() {
    return {
      money: "",
      password: ''
    };
  },

  computed: {},

  created() {
  },

  mounted() {},

  methods: {
    submit() {
      if (!this.money) {
        this.$bus.$emit("toast", "请输入兑换数量");
      } else if (!this.password) {
        this.$bus.$emit("toast", "请输入二级密码");
      } else {
        this.axios
          .post("exchange/integral_exchange", {
            token: this.token(),
            num: this.money,
            sale_code: this.password,
          })
          .then(({ data }) => {
            console.log(data);
            if (data.code == "200") {
              this.$router.push("index");
              this.$bus.$emit("toast", data.msg);
            } else if (data.code == "204") {
              this.$bus.$emit("toast", data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
  }
};
</script>
<style lang='scss' scoped>
#translateIntegral {
  padding-top: 82px;
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
    span {
      font-size: 26px;
    }
  }
  .money {
    width: 690px;
    height: 80px;
    margin: 30px auto;
    input {
      margin-bottom: 20px;
      padding-left: 30px;
      box-sizing: border-box;
      width: 100%;
      line-height: 80px;
      background: rgba(42, 42, 42, 1);
      border-radius: 10px;
      color: #fff;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #999;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #999;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #999;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #999;
    }
  }
}
</style>