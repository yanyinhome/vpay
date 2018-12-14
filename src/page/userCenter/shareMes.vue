<template>
  <div id="shareMes">
    <com-head :opacity="1">分享</com-head>
    <div class="keepdata" @click="shareLog">分享记录</div>
    <p>三维e家</p>
    <p>一种新的生活方式</p>
    <div class="sharemes">
      <p>你的邀请码</p>
      <p>
        <input id="clone" type="text" v-model="code" readonly>
      </p>
      <button @click="clone_code">复制</button>
      <p>邀请好友下载，注册有好礼相送</p>
      <div class="load">
        ---------------&emsp;
        <span>APP下载</span>&emsp;---------------
      </div>
      <div class="erweima">
        <div class="img">
          <canvas id="canvas" width="100px" height="100px"></canvas>
        </div>
        <p>扫码下载APP</p>
        <p>加入三维e家，享受更多权益</p>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
  name: "shareMes",
  data() {
    return {
      code: "",
      url: ""
    };
  },

  computed: {},
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.loading();      
  //   });
  // },
  created() {
    this.loading();
  },

  mounted() {},

  methods: {
    shareLog(){
      this.$router.push({name:'turnOutlog',query:{status: '5'}});
    },
    // 生成二维码
    qrcode() {
      var canvas = document.getElementById("canvas");
      // const ctx = canvas.getContext('2d');
      // ctx.lineTo(100,100);
      QRCode.toCanvas(
        canvas,
        this.url,
        function(error) {
          if (error) console.error(error);
        }
      );
    },
    loading() {
      this.axios
        .post("/user/share", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.url = data.data.url;
            this.code = data.data.UID;
            this.qrcode();
          } else if (data.code === "204") {
            this.$router.push('index');
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    clone_code() {
      let Url = document.getElementById("clone");
      Url.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      if (document.execCommand("Copy")) {
        this.$bus.$emit("toast", "复制成功");
      } else {
        this.$bus.$emit("toast", "若复制失败，请手动复制");
      }
    }
  }
};
</script>
<style lang='scss' scoped>
#shareMes {
  background: url("../../assets/image/loginbg.png");
  background-size: 100% 100%;
  padding-top: 142px;
  text-align: center;
  box-sizing: border-box;
  .keepdata {
    width: 160px;
    height: 80px;
    text-align: center;
    color: #d6ae7b;
    line-height: 80px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }
  p:nth-of-type(1) {
    text-align: center;
    font-size: 70px;
    font-family: Athelas-Bold;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    line-height: 120px;
  }
  p:nth-of-type(2) {
    color: rgba(255, 255, 255, 1);
    line-height: 100px;
  }
  .sharemes {
    background-color: #fff;
    margin: 10px 60px;
    border-radius: 10px;
    padding-bottom: 20px;
    box-sizing: border-box;

    p:nth-of-type(1) {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      color: rgba(214, 175, 124, 1);
      line-height: 140px;
    }
    p:nth-of-type(2) {
      input {
        width: 100%;
        font-size: 60px;
        font-family: HelveticaNeue-Medium;
        font-weight: 600;
        color: rgba(214, 175, 124, 1);
        line-height: 74px;
        text-align: center;
      }
    }
    button {
      margin-top: 20px;
      width: 180px;
      height: 60px;
      color: #fff;
      background: linear-gradient(
        140deg,
        rgba(234, 205, 163, 1) 0%,
        rgba(214, 174, 123, 1) 100%
      );
      border-radius: 36px;
    }
    p:nth-of-type(3) {
      font-size: 24px;
      font-family: PingFangSC-Regular;
      line-height: 110px;
      color: rgba(0, 0, 0, 1);
    }
    .load {
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 110px;
      color: #979797;
      position: relative;
      span {
        color: rgba(0, 0, 0, 1);
      }
      &:before {
        content: "";
        width: 36px;
        height: 36px;
        border-radius: 18px;
        background-color: #000;
        position: absolute;
        bottom: 50%;
        left: 0;
        transform: translate(-50%, 50%);
      }
      &:after {
        content: "";
        width: 36px;
        height: 36px;
        border-radius: 18px;
        background-color: #000;
        position: absolute;
        bottom: 50%;
        right: 0;
        transform: translate(50%, 50%);
      }
    }
    .erweima {
      .img {
        margin: 10px auto;
        // width: 220px;
        // height: 220px;
        // background-color: #000;
      }
      p:nth-of-type(1) {
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 40px;
      }
      p:nth-of-type(2) {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(214, 174, 123, 1);
        line-height: 36px;
      }
    }
  }
}
</style>