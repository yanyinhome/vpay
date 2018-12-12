<template>
  <div id="index">
    <navlist :user="user"></navlist>
    <!-- <button @click="shownav">左侧导航</button> -->
    <div class="index">
      <div class="indextop">
        <div class="user" @click="shownav">
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
        </div>
        <div class="saoma">
          <div class="img">
            <img src="../assets/image/saoma.png">
          </div>
          <p>扫码支付</p>
          <div class="yuor">
            <div class="item">
              <p>账户余额</p>
              <p>{{balance}}</p>
            </div>
            <div class="item">
              <p>积分余额</p>
              <p>{{integral}}</p>
            </div>
          </div>
        </div>
      </div>

      <noticeSwiper :news="news" class="gonggao"></noticeSwiper>
      <div class="turnto">
        <p>账户余额操作</p>
        <div class="box">
          <router-link class="item item1" tag="div" to="turnOut">
            <img src="../assets/image/out.png">转出
          </router-link>
          <div class="item">
            <img src="../assets/image/shou.png">转入
          </div>
        </div>
      </div>
      <div class="turnto">
        <p>积分余额操作</p>
        <div class="box">
          <div class="item item1">
            <img src="../assets/image/buy.png">买入
          </div>
          <div class="item">
            <img src="../assets/image/sell.png">卖出
          </div>
        </div>
      </div>
      <div class="turnto">
        <div class="box1">
          <div class="item">
            <img src="../assets/image/zichan.png">
            <div>资产交易</div>
          </div>
          <div class="item">
            <img src="../assets/image/shoping.png">
            <div>商城</div>
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
        img: require("../assets/image/zanshi/touxiang.jpg"),
        UID: ""
      },
      balance: "",
      integral: "",
      balance: "",
      grade: [],
      news: [
        "2018年7月30日更新升级版本1.0，各种新功能均已上线",
        "2018年9月30日更新升级版本2.0",
        "vpay,2018年11月30日更新升级版本3.0"
      ]
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
    shownav() {
      this.$bus.$emit("navlist");
    }
  }
};
</script>
<style lang='scss' scoped>
#index {
  padding: 10px 30px 150px;
  .index {
    .indextop {
      height: 586px;
      .user {
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
        padding-left: 5px;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(234, 205, 163, 1);
        line-height: 60px;
        border-bottom: 1Px solid rgba(68, 68, 68, 1);
      }
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 26px 0 16px;
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
          border-right: 1Px solid rgba(68, 68, 68, 1);
        }
      }
      .box1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          width: 326px;
          height: 174px;
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
  }
}
</style>