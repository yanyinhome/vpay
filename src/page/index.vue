<template>
  <div id="index">
    <navlist :user="user"></navlist>
    <!-- <button @click="shownav">左侧导航</button> -->
    <div class="index">
      <div class="indextop">
        <div class="user">
          <router-link class="boxmes" tag="div" to="userMessage">
            <div class="left">
              <img :src="user.img">
            </div>
            <div class="right">
              <p>UID：{{user.UID}}</p>
              <p>
                信用：
                <img src="../assets/image/grade.png" v-for="(item,index) in grade" :key="index">
              </p>
            </div>
          </router-link>
          <i class="iconfont icon-sort" @click="shownav"></i>
        </div>
        <div class="saoma">
          <div class="img" @click="warn">
            <img src="../assets/image/saoma.png">
          </div>
          <p>扫码支付</p>
          <div class="yuor">
            <router-link class="item" tag="div" :to="{name:'turnOutlog',query:{status: '4'}}">
              <p>账户余额</p>
              <p>{{balance}}</p>
            </router-link>
            <router-link class="item" tag="div" :to="{name:'turnOutlog',query:{status: '3'}}">
              <p>积分余额</p>
              <p>{{integral}}</p>
            </router-link>
          </div>
        </div>
      </div>

      <noticeSwiper :news="news" class="gonggao"></noticeSwiper>
      <div class="turnto">
        <p>
          <span>余额操作</span>
          <span @click="yuoeLog">变动记录</span>
        </p>
        <div class="box">
          <router-link class="item item1" tag="div" to="turnOut">
            <img src="../assets/image/out.png">转出
          </router-link>
          <router-link class="item" tag="div" to="turnIn">
            <img src="../assets/image/shou.png">转入
          </router-link>
        </div>
        <div class="box xia">
          <!-- <router-link class="item item1" tag="div" :to="{name:'balanceBuy',query:{status: '1'}}">
            <img src="../assets/image/sell.png">提现
          </router-link>
          <router-link class="item" tag="div" :to="{name:'balanceBuy',query:{status: '2'}}">
            <img src="../assets/image/buy.png">购买
          </router-link>-->
          <div class="item item1" @click="warn">
            <img src="../assets/image/sell.png">提现
          </div>
          <div class="item" @click="warn">
            <img src="../assets/image/buy.png">购买
          </div>
        </div>
      </div>
      <div class="turnto">
        <p>积分操作</p>
        <div class="box">
          <!-- <router-link class="item item1" tag="div" to="translateIntegral">
            <img src="../assets/image/duihuan.png">兑换
          </router-link>-->
          <div class="item item1" @click="warn">
            <img src="../assets/image/duihuan.png">兑换
          </div>
          <div class="item" @click="gradeLog">
            <img src="../assets/image/log.png">记录
          </div>
        </div>
      </div>
      <div class="turnto turnto1">
        <div class="box1">
          <div class="item" @click="warn">
            <img src="../assets/image/zichan.png">
            <div>e家公链</div>
          </div>
          <div class="item" @click="warn">
            <img src="../assets/image/shoping.png">
            <div>藏宝阁</div>
          </div>
        </div>
      </div>
    </div>
    <com-foot :select="0"></com-foot>
  </div>
</template>

<script>
import navlist from "../components/navlist";
import noticeSwiper from "../components/notice";
export default {
  name: "index",
  data() {
    return {
      user: {
        img: "",
        UID: ""
      },
      balance: "",
      integral: "",
      balance: "",
      grade: [],
      news: []
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading() {
      this.axios
        .post("/user/index", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.user.img = data.data.head_img;
            this.user.UID = data.data.UID;
            this.balance = data.data.balance;
            this.integral = data.data.integral;
            this.news = data.data.news;
            for (let index = 0; index < data.data.credit; index++) {
              this.grade.push(1);
            }
          } else if (data.code == "204") {
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
        info: "您还没有入住商铺，是否申请店铺入驻",
        button: [
          {
            text: "确认",
            callback: () => {
              this.$router.push("applyShop");
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
    },
    yuoeLog() {
      this.$router.push({ name: "turnOutlog", query: { status: "4" } });
    },
    gradeLog() {
      this.$router.push({ name: "turnOutlog", query: { status: "3" } });
    },
    saoma() {
      this.$router.push("sweepCode");
    },
    warn() {
      this.$bus.$emit("toast", "功能开发中");
    },
    shownav() {
      this.$bus.$emit("navlist");
    }
  },
  // 销毁解绑
  beforeDestroy: function() {
    this.$bus.$emit("comAlert");
  }
};
</script>
<style lang='scss' scoped>
#index {
  padding: 20px 30px 150px;
  .index {
    .indextop {
      height: 586px;
      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .boxmes {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .left {
            margin-right: 20px;
            width: 70px;
            height: 70px;
            border-radius: 35px;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
          .right p {
            font-size: 26px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(214, 174, 123, 1);
            line-height: 36px;
            display: flex;
            align-items: center;
            img {
              display: inline-block;
              width: 26px;
              height: 26px;
            }
          }
        }
        .icon-sort {
          color: rgba(214, 174, 123, 1);
          font-size: 60px;
        }
      }
      .saoma {
        color: #fff;
        .img {
          margin: auto;
          margin-top: 70px;
          width: 204px;
          height: 190px;
          img {
            width: 100%;
          }
        }
        p {
          text-align: center;
          line-height: 140px;
        }
        .yuor {
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          .item {
            width: 350px;
            // border-right: 1Px solid rgba(68,68,68,1);
            p:nth-of-type(1) {
              font-size: 24px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(255, 255, 255, 1);
              line-height: 50px;
            }
            p:nth-of-type(2) {
              font-size: 28px;
              font-family: PingFangSC-Regular;
              font-weight: 400;
              color: rgba(214, 174, 123, 1);
              line-height: 60px;
            }
          }
          .item:nth-of-type(1) {
            position: relative;
            &:after {
              content: "";
              position: absolute;
              height: 60px;
              width: 2px;
              right: 0;
              top: 50%;
              transform: translateY(-50%);
              background: rgba(68, 68, 68, 1);
            }
          }
        }
      }
    }
    .turnto {
      margin-top: 20px;
      padding: 10px;
      box-sizing: border-box;
      // width:690px;
      // height:172px;
      background: rgba(42, 42, 42, 1);
      border-radius: 6px;
      p {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        box-sizing: border-box;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(234, 205, 163, 1);
        line-height: 60px;
        border-bottom: 1px solid rgba(68, 68, 68, 1);
      }
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 30px 0 16px;
        .item {
          width: 50%;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 30px;
          img {
            margin-right: 30px;
            width: 50px;
            height: 50px;
          }
        }
        .item1 {
          border-right: 1px solid rgba(68, 68, 68, 1);
        }
      }
      .xia {
        margin-top: 40px;
      }
      .box1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          width: 336px;
          height: 194px;
          background: rgba(42, 42, 42, 1);
          border-radius: 6px;
          color: #fff;
          text-align: center;
          img {
            margin-top: 30px;
            width: 70px;
            height: 70px;
          }
        }
      }
    }
    .turnto1 {
      padding: 0px;
      background: rgba(42, 42, 42, 0);
    }
  }
}
</style>