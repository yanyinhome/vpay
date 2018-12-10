<template>
  <div id="navlist" v-show="show">
    <div class="usernav">
      <div class="nav">
        <div class="logo"  @click="toUsercenter">
          <img src="../assets/image/zanshi/touxiang.jpg">
        </div>
        <div class="phone">{{phone}}</div>
        <div class="box" @click="toNotice">
          <div class="left">
            <img src="../assets/image/gonggao.png">
          </div>
          <div class="right">
            <span>公告信息</span>
            <i class="iconfont icon-next"></i>
          </div>
        </div>
        <div class="box" @click="toStore">
          <div class="left">
            <img src="../assets/image/dianpu.png">
          </div>
          <div class="right">
            <span>我的店铺</span>
            <i class="iconfont icon-next"></i>
          </div>
        </div>
        <div class="box" @click="toOrder">
          <div class="left">
            <img src="../assets/image/dingdan.png">
          </div>
          <div class="right">
            <span>我的订单</span>
            <i class="iconfont icon-next"></i>
          </div>
        </div>
        <div class="box" @click="toAddress">
          <div class="left">
            <img src="../assets/image/dizhi.png">
          </div>
          <div class="right">
            <span>我的地址</span>
            <i class="iconfont icon-next"></i>
          </div>
        </div>
        <div class="box" @click="toCardlist">
          <div class="left">
            <img src="../assets/image/yinhang.png">
          </div>
          <div class="right">
            <span>我的银行卡</span>
            <i class="iconfont icon-next"></i>
          </div>
        </div>
        <com-button class="btn" :click="signout">退出登录</com-button>
        <div class="footnav">
          <div class="box1">
            <img src="../assets/image/fenxiang.png">
            <p>分享</p>
          </div>
          <div class="box1" @click="toSystem">
            <img src="../assets/image/shezhi.png">
            <p>设置</p>
          </div>
        </div>
      </div>
      <div class="navhide" @click="navout"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navlist",
  data() {
    return {
      huiyuan: "",
      my: "",
      other: "",
      phone: "17639888333",
      // 是否顯示
      show: false,
      // 是否進入
      showIn: false,
      // 是否彈出
      showOut: false,
      // 是否在過程中
      showIng: false,
      // 動畫方式
      animateStyle: [
        {
          in: "fadeInLeft",
          out: "fadeOutRight"
        },
        {
          in: "fadeInUp",
          out: "fadeOutUp"
        }
      ],
      // 動畫方式
      animateIndex: 0
    };
  },

  computed: {},

  created() {
    this.$bus.$on("navlist", this.navshow);
  },

  mounted() {},

  methods: {
    // loading() {
    //   this.axios.post("apireg/home_page", {
    //       token: this.token()
    //     })
    //     .then(({ data }) => {
    //       console.log(data);
    //     if (data.code === "200") {
    //         this.huiyuan = data.data.huiyuan;
    //         this.my = data.data.my;
    //         this.other = data.data.other;
    //       } else if (data.code === "204") {
    //         this.$bus.$emit("toast", data.data);
    //       }
    //     })
    //     .catch(function(error) {
    //       console.log(error);
    //     });
    // },
    toUsercenter() {
      this.navout();
      this.$router.push("userMessage");
    },
    toNotice() {
      this.navout();
      this.$router.push("notice");
    },
    toStore() {
      this.navout();
      this.$router.push("myStore");
    },
    toOrder() {
      this.navout();
      this.$router.push("notice");
    },
    toAddress() {
      this.navout();
      this.$router.push("myAddress");
    },
    toCardlist() {
      this.navout();
      this.$router.push("notice");
    },
    toSystem() {
      this.navout();
      this.$router.push("systemSetup");
    },
    signout() {
      this.navout();
      localStorage.removeItem("token");
      this.$router.push("login");
      this.$bus.$emit("toast", "退出成功");
    },
    navshow(data) {
      if (this.showIng) return false;
      this.animateIndex = Math.floor(Math.random() * 2);
      this.showIng = true;
      this.show = true;
      this.showIn = true;
    },
    navout(data) {
      console.log(3333);
      if (!this.showIng) return false;
      this.animateIndex = Math.floor(Math.random() * 2);
      this.showOut = false;
      this.show = false;
      this.showIng = false;
    }
  }
};
</script>
<style lang='scss' scoped>
#navlist {
  .btn {
    width: 520px;
    height: 70px;
    margin: 188px 30px 0;
    color: #000;
    font-size: 30px;
    background: linear-gradient(
      90deg,
      rgba(214, 174, 123, 1) 0%,
      rgba(234, 205, 163, 1) 100%
    );
    border-radius: 36px;
  }
  .usernav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: flex-start;
    .nav {
      // width: 550px;
      height: 100%;
      overflow: scroll;
      // padding: 42px 32px;
      // box-sizing: border-box;
      background: #14171a;
      .logo {
        margin: 110px auto 0;
        width: 100px;
        height: 100px;
        border-radius: 55px;
        overflow: hidden;
        img {
          height: 100%;
        }
      }
      .phone {
        text-align: center;
        font-size: 28px;
        font-family: PingFangSC-Regular;
        color: rgba(214, 174, 123, 1);
        line-height: 80px;
      }
      .box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        color: #fff;
        border-bottom: 1px solid #444;
        padding: 0 30px;
        box-sizing: border-box;
        .left {
          width: 44px;
          height: 40px;
          img {
            height: 100%;
          }
        }
        .right {
          width: 580px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-left: 20px;
          span {
            font-size: 28px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            line-height: 102px;
          }
          span:nth-of-type(2) {
            display: inline-block;
            vertical-align: middle;
            margin-left: 24px;
            width: 32px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            border-radius: 16px;
            background: rgba(184, 25, 25, 1);
            font-size: 22px;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
      .footnav {
        margin-top: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #fff;
        text-align: center;
        img {
          width: 44px;
          height: 44px;
        }
      }
    }
    .navhide {
      width: 200px;
      height: 100%;
      background: rgba(88, 46, 46, 0);
    }
  }
}
</style>