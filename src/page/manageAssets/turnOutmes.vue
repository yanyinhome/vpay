<template>
  <div id="turnOutmes">
    <com-head :opacity="0">转出
      <router-link class="keepdata" tag="div" :to="{name:'turnOutlog',query:{status: '1'}}">
        <!-- <span>转出记录</span> -->
      </router-link>
    </com-head>
    <div class="headimg">
      <img :src="img">
    </div>
    <p>{{UID}}</p>
    <p>{{phone}}</p>
    <div class="account">
      <input type="text" v-model="money" placeholder="请输入转出金额">
      <input type="password" v-model="password" placeholder="请输入支付密码">
      <p>* 确定转出前请核对转出用户信息</p>
      <com-button :disabled='disabled' :click="submit">确定转出</com-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "turnOutmes",
  data() {
    return {
      disabled: false,
      UID: this.$route.query.UID,
      img: '',
      phone: "",
      money: "",
      password: "",
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
        .post("exchange/exchangeview", {
          token: this.token(),
          UID: this.UID
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.img = data.data.head_img;
            this.UID = data.data.UID;
            this.phone = data.data.phone;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {     
      if (!this.money) {
        this.$bus.$emit("toast", "请输入转出金额");
      } else if (this.money<=0) {
        this.$bus.$emit("toast", "转出金额需大于零");
      } else if (!this.password) {
        this.$bus.$emit("toast", "请输入安全密码");
      } else {
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
        }, 2000)
        this.axios
          .post("exchange/doexchange", {
            token: this.token(),
            sale_code: this.password,
            num: this.money,
            UID: this.UID
          })
          .then(({ data }) => {
            console.log(data);
            if (data.code == "200") {
              this.$bus.$emit("toast", data.msg);
              this.$router.push("index");
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
#turnOutmes {
  padding-top: 82px;
  color: #fff;
  text-align: center;
  p:nth-of-type(1) {
    font-size: 30px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 50px;
  }
  p:nth-of-type(2) {
    font-size: 26px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 30px;
  }
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
  .headimg {
    margin: auto;
    margin-top: 30px;
    width: 120px;
    height: 120px;
    border-radius: 4px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .account {
    width: 690px;
    height: 80px;
    margin: 80px auto;
    input {
      padding-left: 30px;
      margin-top: 30px;
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
    p {
      text-align: left;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(136, 136, 136, 1);
      line-height: 60px;
    }
  }
}
</style>