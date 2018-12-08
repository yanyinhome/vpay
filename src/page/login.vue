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
          <input type="text" v-model="phone" placeholder="请输入用户名/手机号">
          <input type="password" v-model="password" placeholder="请输入登录密码">
        </div>
        <router-link class="forget" tag="div" to="forget">忘记密码？</router-link>
      </div>
      <!-- 注册 -->
      <div class="logininp" v-if="register">
        <div class="item">
          <i class="iconfont icon-yonghuming"/>
          <input type="text" v-model="name" placeholder="请设置用户名">
        </div>
        <div class="item">
          <i class="iconfont icon-3denglumima"/>
          <input type="password" v-model="loginpass" placeholder="请设置登录密码">
        </div>
        <div class="item">
          <i class="iconfont icon-yunongtongqingshurumima"/>
          <input type="password" v-model="safepass" placeholder="请设置支付密码">
        </div>
        <div class="item">
          <i class="iconfont icon-zhucedenglushoujihao"/>
          <input type="text" v-model="tel" placeholder="请输入手机号">
        </div>
        <div class="item verify">
          <i class="iconfont icon-yanzhengyanzhengma"/>
          <input type="text" placeholder="请输入验证码：" v-model="verify">
          <button
            @click="verification"
            :disabled="isSend"
            :class="{'send-sms' : isSend, 'no-send-sms': isSend}"
          >{{btntxt}}</button>
        </div>
        <div class="item">
          <i class="iconfont icon-yaoqingma"/>
          <input type="text" v-model="code" placeholder="请输入邀请码">
        </div>
      </div>
      <div class="jiantou">
        <img src="../assets/image/jiantou.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      login: false,
      register: true,
      phone: "",
      password: "",
      btntxt: "获取验证码",
      sendSMSTime: 0,
      isSend: false,

      name: "",
      loginpass: "",
      safepass: "",
      tel: "",
      verify: "",
      code: "",
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    verification () {
			if (!this.name) {
        this.$bus.$emit('toast', '用户名不能为空');
      } else if (!this.tel){
        this.$bus.$emit('toast', '手机号不能为空');       
      } else if (!this.password){
        this.$bus.$emit('toast', '密码不能为空');       
      } else if (!/^.{6,20}$/.test(this.password)) {
        this.$bus.$emit('toast', '请输入6-20位登录密码');
      } else {
				this.axios.post('Reg/send_sms',{
					mobile: this.tel,
				})
				.then((response)=>{
					if (response.data=='1'){
						this.sendSMSTime = 60;
						this.isSend = true;
						this.disabled = true;
						this.btntxt = '已发送(' + this.sendSMSTime + ')s';
						this.timer();
					}else if(response.data=='2'){
						this.$bus.$emit('toast', '手机号已注册');	
						this.disabled = false;
					}
				})
			}			
    },
    timer () {
      if (this.sendSMSTime > 0) {
        this.sendSMSTime--;
        this.btntxt = `已发送(${this.sendSMSTime})s`;
        setTimeout(() => {
          this.timer();
        }, 1000);
      } else {
        this.sendSMSTime = 0;
        this.btntxt = '重新获取';
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
    // border: 1px solid #e32;
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
      input:nth-of-type(2) {
        margin-top: 40px;
      }
    }
    .forget {
      padding-left: 40px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      color: rgba(255, 255, 255, 1);
      line-height: 70px;
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
    }
    .verify {
      input {
        margin-left: 10px;
        width: 290px;
      }
      button {
        width: 140px;
        background: rgba(237, 70, 70, 0);
        border-radius: 10px;
        color: white;
      }
    }
  }
}
</style>