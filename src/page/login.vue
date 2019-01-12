<template>
  <div id="login">
    <div class="login">
      <div class="title">
        <span :class="{active:login}" @click="login1()">登录</span>
        <span :class="{active:register}" @click="register1()">注册</span>
      </div>
      <!-- 登录 -->
      <div class="logininp" v-if="login">
        <div class="box">
          <input type="text" v-model="phone" placeholder="请输入手机号">
          <input type="password" v-model="password" placeholder="请输入登录密码">
        </div>
        <router-link class="forget" tag="div" to="forget">忘记密码？</router-link>
        <div class="jiantou" @click="loginSubmit">
          <img src="../assets/image/jiantou.png">
        </div>
      </div>
      <!-- 注册 -->
      <div class="logininp" v-if="register">
        <!-- <div class="item">
          <i class="iconfont icon-yonghuming"/>
          <input type="text" v-model="name" placeholder="请设置用户名">
        </div>-->
        <div class="item">
          <i class="iconfont icon-zhucedenglushoujihao"/>
          <input type="text" v-model="tel" placeholder="请输入手机号">
        </div>
        <div class="item verify">
          <i class="iconfont icon-yanzhengyanzhengma"/>
          <input type="text" placeholder="请输入验证码" v-model="verify">
          <button @click="verification" :disabled="isSend">{{btntxt}}</button>
        </div>
        <div class="item">
          <i class="iconfont icon-3denglumima"/>
          <input type="password" v-model="loginpass" placeholder="请设置登录密码">
        </div>
        <div class="item">
          <i class="iconfont icon-yunongtongqingshurumima"/>
          <input type="password" v-model="safepass" placeholder="请设置六位支付密码">
        </div>
        <div class="item">
          <i class="iconfont icon-yaoqingma"/>
          <input type="text" v-model="code" placeholder="请输入邀请码">
        </div>
        <div class="jiantou" @click="resSubmit">
          <img src="../assets/image/jiantou.png">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login: true,
      register: false,
      phone: "",
      password: "",
      btntxt: "获取验证码",
      sendSMSTime: 0,
      isSend: false,

      loginpass: "",
      safepass: "",
      tel: "",
      verify: "",
      code: ""
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    loginSubmit() {
      if (!this.phone) {
        this.$bus.$emit("toast", "请输入手机号");
      } else if (!this.password) {
        this.$bus.$emit("toast", "请输入登录密码");
      } else {
        this.axios
          .post("register/login", {
            password: this.password,
            user_num: this.phone
          })
          .then(({ data }) => {
            if (data.code == "200") {
              if (!localStorage.token) {
                localStorage.setItem("token", data.data);
              } else {
                localStorage.removeItem("token");
                localStorage.setItem("token", data.data);
              }
              this.$router.push("index");
              this.$bus.$emit("toast", "登录成功");
            } else if (data.code == "204") {
              this.$bus.$emit("toast", data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    resSubmit() {
      if (!this.verify) {
        this.$bus.$emit("toast", "验证码不能为空");
      } else if (!this.loginpass) {
        this.$bus.$emit("toast", "登录密码不能为空");
      } else if (!this.safepass) {
        this.$bus.$emit("toast", "支付密码不能为空");
      } else if (!this.code) {
        this.$bus.$emit("toast", "邀请码不能为空");
      } else {
        this.axios
          .post("register/reg", {
            password: this.loginpass.replace(/\s/g, ""),
            sale_code: this.safepass.replace(/\s/g, ""),
            phone: this.tel,
            pid: this.code.replace(/\s/g, ""),
            param: this.verify
          })
          .then(({ data }) => {
            if (data.code == "200") {
              this.$bus.$emit("toast", data.msg);
              this.$router.go(0);
            } else if (data.code == "204") {
              this.$bus.$emit("toast", data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    verification() {
      let regTel = /^(1[3-9])\d{9}$/;
      if (!this.tel) {
        this.$bus.$emit("toast", "手机号不能为空");
      } else if (!regTel.test(this.tel)) {
        this.$bus.$emit("toast", "手机号码不合法");
      } else {
        this.isSend = true;
        this.axios
          .post("register/getcode", {
            type: "1",
            account: this.tel
          })
          .then(({ data }) => {
            console.log(22);

            if (data.code == "200") {
              this.sendSMSTime = 60;
              this.isSend = true;
              this.btntxt = "已发送(" + this.sendSMSTime + ")s";
              this.timer();
              this.$bus.$emit("toast", data.msg);
            } else if (data.code == "204") {
              this.isSend = false;
              this.$bus.$emit("toast", data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    timer() {
      if (this.sendSMSTime > 0) {
        this.sendSMSTime--;
        this.btntxt = `已发送(${this.sendSMSTime})s`;
        setTimeout(() => {
          this.timer();
        }, 1000);
      } else {
        this.sendSMSTime = 0;
        this.btntxt = "重新获取";
        this.isSend = false;
      }
    },
    login1() {
      this.login = true;
      this.register = false;
    },
    register1() {
      this.login = false;
      this.register = true;
    }
  }
};
</script>
<style lang='scss' scoped>
#login {
  background: url("../assets/image/loginbg.png");
  background-size: contain;
  padding-top: 200px;
  .login {
    margin: 0 auto;
    width: 590px;
    // border: 1Px solid #e32;
    position: relative;
    .jiantou {
      width: 110px;
      height: 110px;
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translate(-50%, 50%);
    }
    img {
      width: 100%;
    }
  }
  .title {
    margin: 0 auto;
    text-align: center;
    width: 380px;
    display: flex;
    justify-content: space-between;
    font-size: 40px;
    font-family: PingFangSC-Regular;
    color: rgba(221, 221, 221, 1);
    line-height: 56px;
    box-sizing: border-box;

    span {
      width: 120px;
      padding: 10px 0;
    }
    .active {
      border-bottom: 4px solid #d6ae7b;
    }
  }
  .logininp {
    margin-top: 54px;
    padding-bottom: 134px;
    width: 590px;
    // height:478px;
    border-radius: 20px;
    background: #212121;
    .box {
      width: 100%;
      input {
        padding-left: 20px;
        box-sizing: border-box;
        margin: 80px 40px 0;
        width: 510px;
        height: 80px;
        background: rgba(255, 255, 255, 1);
        border-radius: 40px;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #888;
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
    .forget {
      padding-left: 50px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 80px;
    }
    .item {
      color: #fff;
      width: 510px;
      margin: 0 auto;
      line-height: 100px;
      border-bottom: 2px solid rgba(68, 68, 68, 1);
      .iconfont {
        font-size: 35px;
      }
      input {
        margin-left: 20px;
        color: #fff;
        background: rgba(0, 0, 0, 0);
        width: 400px;
        line-height: 100px;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #888;
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
    }
    .verify {
      input {
        margin-left: 10px;
        padding-left: 10px;
        width: 270px;
      }
      button {
        width: 160px;
        background: rgba(237, 70, 70, 0);
        border-radius: 10px;
        color: #d6ae7b;
      }
    }
  }
}
</style>