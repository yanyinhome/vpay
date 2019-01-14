<template>
  <div id="turnOut">
    <com-head :opacity="0">转出
      <router-link class="keepdata" tag="div" :to="{name:'turnOutlog',query:{status: '1'}}">
        <span>转出记录</span>
      </router-link>
    </com-head>
    <!-- 转出 -->
    <div class="account">
      <input type="text" v-model="account" placeholder="请输入对方UID">
      <com-button :click="submit">下一步</com-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "turnOut",
  data() {
    return {
      account: ""
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    submit() {
      if (!this.account) {
        this.$bus.$emit("toast", "请输入对方UID");
      } else {
        this.axios
          .post("exchange/index", {
            token: this.token(),
            UID: this.account
          })
          .then(({ data }) => {
            console.log(data);
            if (data.code == "200") {
              this.$router.push({
                name: "turnOutmes",
                query: { UID: data.data }
              });
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
#turnOut {
  padding-top: 82px;
  .keepdata {
    width: 160px;
    height: 80px;
    text-align: center;
    color: #fff;
    line-height: 80px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
    span {
      font-size: 26px;
    }
  }
  .account {
    width: 690px;
    height: 80px;
    margin: 30px auto;
    input {
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