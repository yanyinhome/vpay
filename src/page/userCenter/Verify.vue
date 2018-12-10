<template>
  <div id="Verify">
    <com-head :opacity="1">验证手机号</com-head>
    <div class="wendao">
      <p>绑定银行卡需要短信确认</p>
      <p>验证码已发送至手机：{{phone}}，请按提示操作。</p>
    </div>

    <div class="item verify">
      验证码
      <input type="text" placeholder="填写验证码" v-model="verify">
      <button @click="verification" :disabled="isSend">{{btntxt}}</button>
    </div>
    <com-button :click="rewrite">完成</com-button>
  </div>
</template>

<script>
export default {
  name: "Verify",
  data() {
    return {
      phone: "",
      verify: "",
      btntxt: "获取验证码",
      sendSMSTime: 0,
      isSend: false
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    verification () {
      if (!this.verify){
        this.$bus.$emit('toast', '验证码不能为空');       
      } else {
				this.axios.post('register/getcode',{
          type: '1',
          account: this.tel
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
  }
};
</script>
<style lang='scss' scoped>
#Verify {
  padding-top: 82px;
  background-color: #f6f6f6;
  .wendao {
    margin: 0 30px;
    padding: 40px 0;
    font-size: 28px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(136, 136, 136, 1);
  }
  .item {
    color: #3c3c3c;
    width: 690px;
    margin: 0 auto;
    line-height: 100px;
    border-bottom: 2px solid #999;
    .iconfont {
      font-size: 35px;
    }
    input {
      margin-left: 20px;
      background: rgba(0, 0, 0, 0);
      width: 400px;
      line-height: 100px;
      padding-left: 10px;
      width: 400px;
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

    button {
      width: 140px;
      background: rgba(237, 70, 70, 0);
      border-radius: 10px;
      color: #d6ae7b;
    }
  }
}
</style>