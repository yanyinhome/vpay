<template>
  <div id="forget">
    <div class="login">
      <div class="logininp">
        <div class="item">
          <input type="text" v-model="tel" placeholder="请输入手机号">
        </div>
        <div class="item verify">
          <input type="text" placeholder="请输入验证码：" v-model="verify">
          <button
            @click="verification"
            :disabled="isSend"
          >{{btntxt}}</button>
        </div>
        <div class="item">
          <input type="password" v-model="loginpass1" placeholder="请设置登录密码">
        </div>
        <div class="item">
          <input type="password" v-model="loginpass2" placeholder="确认登录密码">
        </div>
      </div>
      <div class="jiantou" @click="submitTo">
        <img src="../assets/image/jiantou.png">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forget",
  data() {
    return {
      btntxt: "获取验证码",
      sendSMSTime: 0,
      isSend: false,

      tel: "",
      verify: "",
      loginpass1: "",
      loginpass2: "",
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    submitTo(){
      if (!this.loginpass1||!this.loginpass2){
        this.$bus.$emit('toast', '密码不能为空');       
      } else if (this.loginpass1 !== this.loginpass2) {
        this.$bus.$emit("toast", "俩次输入的密码不一致");
      } else {
        this.axios.post('register/forgetpwd',{
          param: this.verify,
          account: this.tel,
          newpassword: this.loginpass1.replace(/\s/g,'')
				})
				.then(({data})=>{
					if (data.code=='200'){
            this.$router.push("login");
            this.$bus.$emit('toast', data.msg);	           						
					} else if(data.code=='204'){
						this.$bus.$emit('toast', data.msg);	
					}
        })
        .catch(function(error) {
          console.log(error);
        });
      }
    },
    verification () {
      let regTel = /^(1[3-9])\d{9}$/;
			if (!this.tel){
        this.$bus.$emit('toast', '手机号不能为空');       
      } else if (!regTel.test(this.tel)) {
        this.$bus.$emit("toast", "手机号码不合法");
      } else {
			  this.isSend = true;
				this.axios.post('register/getcode',{
          type: '2',
          account: this.tel
				})
				.then(({data})=>{
					if (data.code=='200'){
            this.sendSMSTime = 60;
            this.isSend = true;
            this.btntxt = '已发送(' + this.sendSMSTime + ')s';
					  this.timer();
            this.$bus.$emit('toast', data.msg);	           						
					} else if(data.code=='204'){
            this.$bus.$emit('toast', data.msg);	
            this.isSend = false;            
					}
        })
        .catch(function(error) {
          console.log(error);
        });
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
  }
};
</script>
<style lang='scss' scoped>
#forget {
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
  }
  .logininp {
    margin-top: 130px;
    padding-bottom: 134px;
    width: 590px;
    // height:478px;
    border-radius: 20px;
    background: #212121;
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
        color: #D6AE7B;
      }
    }
  }
}
</style>