<template>
  <div id="Cardmes">
    <com-head :opacity="1">添加银行卡</com-head>
    <p>请绑定本人的银行卡</p>
    <div class="message">
      <div class="box">
        <span>开户行</span>
        <input type="text" v-model="bank" placeholder="请输入开户行">
        <!-- <i class="iconfont icon-next"/> -->
      </div>
      <div class="box">
        <span>开户支行</span>
        <input type="text" v-model="branch" placeholder="请输入开户支行地址">
      </div>
      <div class="box">
        <span>持卡人</span>
        <input type="text" v-model="name" placeholder="请输入持卡人姓名">
      </div>
      <div class="box">
        <span>卡号</span>
        <input type="text" v-model="number" placeholder="请输入银行卡">
      </div>
    </div>

    <div class="moren">
      <i v-if="checkbox" @click="checkbox = !checkbox" class="iconfont icon-fuxuankuang"/>
      <i v-else @click="checkbox = !checkbox" class="iconfont icon-fangkuang"/>&nbsp;设置为默认银行卡
    </div>
    <com-button :click="addCard">添加</com-button>
  </div>
</template>

<script>
export default {
  name: "Cardmes",
  data() {
    return {
      bank: "",
      branch: "",
      name: "",
      number: "",
      checkbox: false
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    addCard() {
      // 验证银行卡
      let cardReg = /^([1-9]{1})(\d{15}|\d{18})$/;
      if (!this.bank) {
        this.$bus.$emit("toast", "开户行不能为空");
      } else if (!this.branch) {
        this.$bus.$emit("toast", "开户支行不能为空");
      } else if (!this.name) {
        this.$bus.$emit("toast", "请输入持卡人姓名");
      } else if (!this.number) {
        this.$bus.$emit("toast", "请输入银行卡号");
      } else if (!cardReg.test(this.number)) {
        this.$bus.$emit("toast", "你输入的银行卡号不合法");
      } else {
        this.axios
          .post("user/addbank", {
            token: this.token(),
            bank_name: this.name,
            open_bank: this.bank,
            bank_num: this.number,
            bank_address: this.branch,
            checkbox: this.checkbox
          })
          .then(({ data }) => {
            console.log(data);
            if (data.code == "200") {
              this.$router.push("myCardlist");
              this.$bus.$emit("toast", data.msg);
            } else if (data.code == "204") {
              this.$bus.$emit("toast", data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
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
      border-bottom: 1Px solid rgba(0, 0, 0, 0.2);
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
    box-sizing: border-box;
    .iconfont {
      color: #979797;
      font-size: 36px;
    }
    .icon-fuxuankuang {
      color: #eacda3;
      font-size: 36px;
    }
  }
}
</style>