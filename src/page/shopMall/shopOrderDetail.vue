<template>
  <div id="shopOrderDetail">
    <com-head :opacity="1">订单详情</com-head>

    <div class="user">
      <div class="topmes">
        <div class="left">
          <img src="../../assets/image/jihuo.png" alt>
        </div>
        <div class="right">
          <p>
            <span>{{message2.UID}}</span>
            <span>{{message2.phone}}</span>
          </p>
          <p>{{message2.address}}</p>
        </div>
      </div>
      <div class="topmes">
        <div class="left">
          <img src="../../assets/image/shouhuo.png" alt>
        </div>
        <div class="right">
          <p>
            <span>{{message1.UID}}</span>
            <span>{{message1.phone}}</span>
          </p>
          <p>{{message1.address}}</p>
        </div>
      </div>
    </div>
    <div class="user good">
      <div class="topmes">
        <div class="left">
          <img :src="message3.imgurl" alt>
        </div>
        <div class="right">
          <p>
            <span>{{message3.name}}</span>
          </p>
          <p>
            <span>&yen;{{message3.price}}</span>
            <span>x{{message3.num}}</span>
          </p>
        </div>
      </div>
      <div class="telbox">
        <div class="box1" @click="telflat">
          <i class="iconfont icon-dadianhua"></i>
          <span>联系平台</span>
        </div>
        <div class="box1 box2" @click="telbuyer">
          <i class="iconfont icon-dadianhua"></i>
          <span>联系买家</span>
        </div>
      </div>
    </div>
    <div class="footmes">
      <p>订单编号：{{message4.order_number}}</p>
      <p>下单时间：{{message4.create_time}}</p>
      <p>付款时间：{{message4.pay_time}}</p>
    </div>
    <div class="footmes">
      <p>订单状态：{{message4.status|orderStaus}}</p>
    </div>
    <div class="comAlert" v-show="show">
      <div class="alertbox">
        <div class="alerttop">
          <div class="box1">
            <a :href="`tel://${tel}`">{{tel}}</a>
          </div>
        </div>
        <div class="alertfoot" @click="show=false">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopOrderDetail",
  data() {
    return {
      id: this.$route.query.id,
      show: false,
      message1: {},
      message2: {},
      message3: {},
      message4: {},
      tel: ""
    };
  },

  computed: {},

  created() {
    this.loading();
  },
  mounted() {},
  filters: {
    orderStaus(value) {
      const orderanv = ["待支付", "待发货", "待收货", "已完成"];
      return orderanv[value - 1];
    }
  },
  methods: {
    loading() {
      this.axios
        .post("/shop/order_info", {
          token: this.token(),
          id: this.id
        })
        .then(({ data }) => {
          
          if (data.code === "200") {
            this.message1 = data.data.buy;
            this.message2 = data.data.sell;
            this.message3 = data.data.good;
            this.message4 = data.data.order;
            this.pintai = data.data.pintai;
          } else if (data.code === "201") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    telflat() {
      this.show = true;
      this.tel = this.pintai;
    },
    telbuyer() {
      this.show = true;
      this.tel = this.message1.phone;
    }
  }
};
</script>
<style lang='scss' scoped>
#shopOrderDetail {
  padding-top: 82px;
  background-color: #f6f6f6;
  .user {
    background-color: #fff;
    margin-top: 20px;
    .topmes {
      margin: 0px 30px;
      padding: 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1Px solid #f0f0f0;
      .left {
        width: 50px;
        height: 58px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        margin-left: 20px;
        width: 610px;
        p:nth-of-type(1) {
          font-size: 28px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(0, 0, 0, 1);
          line-height: 40px;
        }
        p:nth-of-type(2) {
          font-size: 24px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 60px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
        }
      }
    }
  }
  .good {
    .topmes {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 30px 0;
      .left {
        width: 130px;
        height: 130px;
        // background: rgba(216, 216, 216, 1);
        border-radius: 6px;
      }
      .right {
        width: 560px;
        p:nth-of-type(2) {
          margin-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
    }
    .telbox {
      margin: 0 30px;
      padding: 30px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .box1 {
        width: 330px;
        line-height: 70px;
        text-align: center;
        border-radius: 6px;
        border: 1Px solid rgba(187, 187, 187, 1);
        .icon-dadianhua {
          font-size: 34px;
          color: #d6ae7b;
          margin-right: 10px;
        }
        span {
          font-size: 24px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
  }
  .footmes {
    margin: 20px 0px;
    padding: 30px 30px;
    background-color: #fff;
    p {
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 50px;
    }
  }
  .comAlert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 999;
    background: rgba(4, 4, 15, 0.4);
    .alertbox {
      width: 686px;
      height: 212px;
      position: absolute;
      bottom: 20px;
      left: 32px;
      .alerttop {
        height: 100px;
        background-color: rgba(255, 255, 255, 1);
        border-radius: 10px;
        text-align: center;
        .box1 {
          height: 100px;
          line-height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          span {
            font-size: 28px;
          }
          img {
            width: 30px;
            height: 30px;
          }
          a {
            text-decoration: none;
            color: #d6ae7b;
          }
        }
        .box2 {
          border-top: 1Px solid #eee;
          img {
            width: 40px;
            height: 36px;
          }
        }
      }
      .alertfoot {
        margin-top: 10px;
        height: 100px;
        font-size: 32px;
        text-align: center;
        line-height: 100px;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
      }
    }
  }
}
</style>