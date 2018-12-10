<template>
  <div id="rewritePassword">
    <com-head :opacity="1">修改登录密码</com-head>
    <div class="box">
      <input type="password" placeholder="请输入您的旧密码" v-model="oldpass">
    </div>
    <div class="box">
      <input type="password" placeholder="请输入您的新密码" v-model="newpass1">
    </div>
    <div class="box">
      <input type="password" placeholder="输入新密码" v-model="newpass2">
    </div>
    <com-button :click="rewrite">确定修改</com-button>
  </div>
</template>

<script>
export default {
  name: "rewritePassword",
  data() {
    return {
      oldpass: "",
      newpass1: "",
      newpass2: ""
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    // rewrite() {
    //   if (!this.oldpass || !this.newpass1 || !this.newpass2) {
    //     this.$bus.$emit("toast", "密码不能为空");
    //   } else if (this.newpass1 !== this.newpass2) {
    //     this.$bus.$emit("toast", "密码不一致");
    //   } else {
    //     this.axios
    //       .post("apireg/editpwd", {
    //         token: this.token(),
    //         type: passwordtype,
    //         oldcode: this.oldpass,
    //         newcode: this.newpass1,
    //         newcode1: this.newpass2
    //       })
    //       .then(({ data }) => {
    //         if (data.code === "200") {
    //           this.$bus.$emit("comAlert", {
    //             title: "温馨提示",
    //             info: "密码已修改，请牢记密码",
    //             button: [
    //               {
    //                 text: "确认",
    //                 callback: () => {
    //                   this.$router.push("usercenter");
    //                 }
    //               }
    //             ]
    //           });
    //         } else if (data.code === "204") {
    //           this.$bus.$emit("toast", data.data);
    //         }
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   }
    // }
  }
};
</script>
<style lang='scss' scoped>
#rewritePassword {
  background-color: #f6f6f6;
  padding-top: 82px;
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
</style>