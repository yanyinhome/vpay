<template>
  <div id="navlist" v-show="show">
    <div class="usernav">
      <div class="nav">
        <div class="logo"  @click="toUsercenter">
          <img :src="user.img">
        </div>
        <div class="phone">{{user.UID}}</div>
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
          <div class="box1" @click="toShare">
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
  props: ["user"],
  computed: {},

  created() {
    this.$bus.$on("navlist", this.navshow);
  },

  mounted() {},

  methods: {
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
      // this.$bus.$emit("toast", "功能开发中");
      this.axios
        .post("/shop/my_shop", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$router.push("shoplist"); 
          } else if (data.code === "201") {
            this.$router.push({name:"applyShop",query: {applyStatus: true}}); 
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "202") {
            this.$router.push({name:"applyShop",query: {applyStatus: false}}); 
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.applyShop();
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    applyShop() {
      this.$bus.$emit("comAlert", {
        title: "暂无商铺",
        info: "您还没有入住商铺，是否申请？",
        button: [
          {
            text: "确认",
            callback: () => {
            this.$router.push({name:"applyShop",query: {applyStatus: false}});               
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
    },
    toOrder() {
      this.navout();
      // this.$bus.$emit("toast", "功能开发中");
      this.$router.push("myorder");
    },
    toAddress() {
      this.navout();
      // this.$bus.$emit("toast", "功能开发中");
      this.$router.push("myAddress");
    },
    toCardlist() {
      this.navout();
      this.$router.push("myCardlist");
    },
    toSystem() {
      this.navout();
      this.$router.push("systemSetup");
    },
    toShare() {
      this.loading();
      this.navout();     
    },
    signout() {
      this.navout();
      localStorage.removeItem("token");
      this.$router.push("login");
      this.$bus.$emit("toast", "退出成功");
    },
    loading() {
      this.axios
        .post("/user/share", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$router.push("shareMes");
          } else if (data.code === "204") {
            this.$router.push('index');
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    navshow(data) {
      if (this.showIng) return false;
      this.animateIndex = Math.floor(Math.random() * 2);
      this.showIng = true;
      this.show = true;
      this.showIn = true;
    },
    navout(data) {
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
      height: 110%;
      overflow: scroll;
      // padding: 42px 32px;
      // box-sizing: border-box;
      background: #14171a;
      .logo {
        margin: 110px auto 0;
        width: 100px;
        height: 100px;
        border: 1Px solid #222;
        border-radius: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        img {
          width: 100%;
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
        border-bottom: 1Px solid #444;
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