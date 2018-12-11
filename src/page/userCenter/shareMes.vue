<template>
  <div id="shareMes">
    <com-head :opacity="1">分享</com-head>
    <p>Vpay</p>
    <p>一种新的生活方式</p>
    <div class="sharemes">
      <p>你的邀请码</p>
      <p>{{code}}<input :id="clone" type="text" v-model="text" readonly></p>
      <button>复制</button>
      <p>邀请好友下载，注册有好礼相送</p>
      <div class="load">
        ---------------&emsp;
        <span>APP下载</span>&emsp;---------------
      </div>
      <div class="erweima">
        <div class="img">
          <img src>
        </div>
        <p>扫码下载Vpay钱包</p>
        <p>加入Vpay享受更多权益</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shareMes",
  data() {
    return {
      code: "12345",
      url: ''
    };
  },

  computed: {},

  created() {
    this.loading();
  },

  mounted() {},

  methods: {
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
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", '暂无数据');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
  p:nth-of-type(1) {
    text-align: center;
    font-size: 86px;
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
      font-size: 60px;
      font-family: HelveticaNeue-Medium;
      font-weight: 600;
      color: rgba(214, 175, 124, 1);
      line-height: 74px;
    }
    button {
      margin-top: 20px;
      width: 180px;
      height: 60px;
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
        width: 220px;
        height: 220px;
        background-color: #000;
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