<template>
  <div id="turnOut">
    <com-head :opacity="0">转入
      <router-link class="keepdata" tag="div" :to="{name:'turnOutlog',query:{status: '2'}}">
        <span>转入记录</span>
      </router-link>
    </com-head>
    <!-- 转入 -->
    <div class="erweima">
      <div class="img">
        <canvas id="canvas" width="300px" height="300px"></canvas>
      </div>
      <p>扫一扫</p>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "turnOut",
  data() {
    return {};
  },

  computed: {},
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.loading();
    });
  },
  created() {},

  mounted() {},

  methods: {
    loading() {
      this.axios
        .post("exchange/changeinto", {
          token: this.token()
        })
        .then(({ data }) => {
          
          if (data.code == "200") {
            const url = data.data.url;
            this.qrcode(url);
          } else if (data.code == "204") {
            this.$router.push("index");
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    qrcode(url) {
      var canvas = document.getElementById("canvas");
      QRCode.toCanvas(canvas, url, function(error) {
        if (error) console.error(error);
      });
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
    position: absolute;
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
  .erweima {
    text-align: center;
    margin: 20vh auto;
    p {
      font-size: 32px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(214, 174, 123, 1);
      line-height: 80px;
    }
  }
}
</style>