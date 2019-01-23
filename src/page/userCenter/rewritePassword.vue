<template>
  <div id="rewritePassword">
    <com-head :opacity="1">{{name}}</com-head>
    <div class="password" v-show="status!=2">
      <div class="box">
        <input type="password" placeholder="请输入您的旧密码" v-model="oldpass">
      </div>
      <div class="box">
        <input type="password" placeholder="请输入您的新密码" v-model="newpass1">
      </div>
      <div class="box">
        <input type="password" placeholder="确认新密码" v-model="newpass2">
      </div>
      <com-button :click="rewriteTo">确定修改</com-button>
    </div>

    <div class="about" v-show="status==2">{{about}}</div>
  </div>
</template>

<script>
export default {
  name: "rewritePassword",
  data() {
    return {
      name: "",
      status: this.$route.query.status,
      oldpass: "",
      newpass1: "",
      newpass2: "",
      about: ""
    };
  },

  computed: {},

  created() {
    if (this.status === "0") {
      //修改登录密码
      this.name = "修改登录密码";
    } else if (this.status === "1") {
      //修改支付密码
      this.name = "修改支付密码";
    } else if (this.status === "2") {
      //关于我们
      this.name = "关于我们";
      this.loading();
    }
  },

  mounted() {},

  methods: {
    loading() {
      this.axios
        .post("/user/system", {
          token: this.token()
        })
        .then(({ data }) => {
          
          if (data.code == "200") {
            this.about = data.data.about;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    rewriteTo() {
      if (!this.oldpass || !this.newpass1 || !this.newpass2) {
        this.$bus.$emit("toast", "密码不能为空");
      } else if (this.newpass1 !== this.newpass2) {
        this.$bus.$emit("toast", "俩次输入密码不一致");
      } else {
        if (this.status === "0") {
          //登录
          this.rewrite("1");
        } else if (this.status === "1") {
          //安全
          this.rewrite("2");
        }
      }
    },
    rewrite(passwordtype) {
      this.axios
        .post("user/editpwd", {
          token: this.token(),
          type: passwordtype,
          oldpwd: this.oldpass.replace(/\s/g, ""),
          newpwd: this.newpass1.replace(/\s/g, "")
        })
        .then(({ data }) => {
          
          if (data.code === "200") {
            this.$bus.$emit("comAlert", {
              title: "温馨提示",
              info: "密码已修改，请牢记密码",
              button: [
                {
                  text: "确认",
                  callback: () => {
                    this.$router.push("index");
                  }
                }
              ]
            });
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
#rewritePassword {
  background-color: #f6f6f6;
  padding-top: 82px;
  .password {
    .box {
      input {
        width: 750px;
        padding-left: 30px;
        box-sizing: border-box;
        margin-top: 20px;
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
    }
  }
  .about {
    padding: 0 30px;
    box-sizing: border-box;
  }
}
</style>