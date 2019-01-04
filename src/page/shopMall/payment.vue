<template>
  <div id="payment">
    <com-head :opacity="1"></com-head>
    <router-link to="myaddress" tag="div" class="myaddress">
      <div class="left">
        <img src="../../assets/image/address.png" alt>
      </div>
      <div class="center">
        <p>
          <span>收货人：{{message.name}}&emsp;{{message.phone}}</span>
        </p>
        <p>{{message.province+message.city+message.area+message.address}}</p>
      </div>
      <div class="right">
        <i class="iconfont icon-next"></i>
      </div>
    </router-link>
    <div class="order">
      <div class="orderCenter">
        <div class="box1">
          <img :src="goods.imgurl">
        </div>
        <div class="box2">
          <p>{{goods.name}}</p>
          <p>{{goods.content}}</p>
          <div class="numsell">
            <span>&yen;{{goods.price}}</span>
            <div class="rightbox">
              <div class="minus" @click="minus()">-</div>
              <div class="blank">{{count}}</div>
              <div class="add" @click="add()">+</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="miaoshu">
      <div class="item1">
        <span>备注：</span>
      </div>
      <div class="beizhu">
        <textarea
          style="resize:none"
          border
          maxlength="50"
          placeholder="请输入备注，最多50个字哦"
          v-model="content"
          cols="80"
          rows="4"
        ></textarea>
        <span class="number">{{number}}/50</span>
      </div>
    </div>
    <div class="show" v-show="show">
      <div class="box">
        <div class="title">
          请输入支付密码
          <span @click="show=false" class="iconfont icon-chahao"></span>
        </div>
        <div class="money">&yen;{{goods.price * count}}</div>
        <div class="container">
          <div class="item" v-for="i in 6" :key="i">{{numbers[i-1]|hideNum}}</div>
          <input type="password" v-model="numbers" maxlength="6">
        </div>
      </div>
    </div>
    <div class="footBuy">
      <div class="box1">
        实付：
        <span>&yen;{{goods.price * count}}</span>
      </div>
      <div class="box2">
        <button @click="payAlert">立即支付</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payment",
  data() {
    return {
      numbers: "",

      show: false,
      sale_code: "",
      count: "1",
      content: "",
      number: "0",
      disabled: false,
      message: {},
      goods: {}
    };
  },
  watch: {
    content: function(a, b) {
      this.number = a.length;
      console.log(this.number);
      if (this.number > 49) {
        this.$bus.$emit("toast", "字数不能超过50");
      }
    },
    numbers(newValue, oldValue) {
      if (newValue.length == 6) {
        this.buySome(newValue);
      }
    }
  },
  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading() {
      this.axios
        .post("/shop/buy_goods", {
          token: this.token(),
          id: this.$route.query.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.goods = data.data.goods;
            if (localStorage.message) {
              this.message = JSON.parse(localStorage.getItem("message"));
            } else {
              this.message = data.data.address;
            }
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    buySome(newValue) {
      this.disabled = true;
      setTimeout(() => {
        this.disabled = false;
      }, 2000);
      this.axios
        .post("/shop/buy_sub", {
          token: this.token(),
          id: this.$route.query.id,
          address_id: this.message.id,
          content: this.content,
          num: this.count,
          sale_code: newValue
        })
        .then(({ data }) => {
          this.show = false;
          console.log(data);
          if (data.code == "200") {
            localStorage.removeItem("message");
            this.$router.push("buySuccess");
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    payAlert() {
      if (!this.message.name) {
        this.$bus.$emit("toast", "请设置你的收货地址");
      } else {
        this.show = true;
      }
    },
    minus() {
      if (this.count > 1) {
        this.count--;
      }
    },
    // 加商品的数量
    add() {
      this.count++;
    }
  }
};
</script>
<style lang='scss' scoped>
#payment {
  background-color: #f6f6f6;
  padding-top: 82px;
  .myaddress {
    padding: 30px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
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
    .center {
      margin-left: 20px;
      width: 560px;
      p:nth-of-type(1) {
        font-size: 30px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(3, 3, 3, 1);
        line-height: 40px;
        word-break: break-all;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        line-height: 60px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
    .right {
      color: #888888;
      .iconfont {
        font-size: 40px;
      }
    }
  }
  .order {
    margin-top: 20px;
    width: 750px;
    padding: 10px 30px;
    background: rgba(255, 255, 255, 1);
    box-sizing: border-box;
    .orderCenter {
      margin: 20px 0px;
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .box1 {
        width: 186px;
        max-height: 186px;
        border-radius: 6px;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .box2 {
        width: 500px;
        margin-left: 30px;
        p:nth-of-type(1) {
          font-size: 30px;
          line-height: 40px;
          color: #000;
          line-height: 60px;
        }
        p:nth-of-type(2) {
          word-break: break-all;
          font-size: 26px;
          color: #999;
          line-height: 40px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .numsell {
          font-size: 28px;
          color: #000;
          line-height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            color: #f10f0f;
          }
          .rightbox {
            margin-left: 10px;
            display: flex;
            align-items: center;
            line-height: 100px;
            font-size: 28px;
            color: #999;
            border-radius: 6px;

            border: 1Px solid #999999;
            .add,
            .minus {
              width: 46px;
              line-height: 46px;
              height: 46px;
              text-align: center;
              color: #9290ae;
              &:hover {
                // background: #e5e5e5;
              }
            }
            .blank {
              width: 60px;
              line-height: 46px;
              // height: 45px;
              text-align: center;
              color: #282828;
              border-left: 1Px solid #999999;
              border-right: 1Px solid #999999;
            }
          }
        }
      }
    }
  }
  .miaoshu {
    margin-top: 20px;
    background-color: #fff;
    .item1 {
      margin: 0 30px;
      line-height: 90px;
      font-size: 30px;
    }
    .beizhu {
      position: relative;
      padding-bottom: 20px;
      text-align: center;
      textarea {
        width: 690px;
        margin: auto;
        padding: 10px;
        border: 1Px solid rgba(238, 238, 238, 1);
        box-sizing: border-box;
      }
      .number {
        color: #ddd;
        position: absolute;
        bottom: 32px;
        right: 36px;
      }
    }
  }
  .show {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: rgba(0, 0, 0, 0.6);
    .box {
      width: 590px;
      box-sizing: border-box;
      padding: 30px 40px 50px;
      background: #fff;
      border-radius: 10px;
      position: absolute;
      top: 22%;
      left: 80px;
      text-align: center;
      .title {
        font-weight: 400;
        font-size: 30px;
        line-height: 80px;
        position: relative;
        // border-bottom: 1Px solid #ddd;
        span {
          position: absolute;
          right: -10px;
          top: -10px;
          color: #666;
          font-size: 40px;
        }
      }
      .money {
        line-height: 100px;
        font-size: 50px;
      }
      .container {
        margin: 30px auto;
        position: relative;
        //   margin: auto;
        height: 88px;
        // width: 528px;
        display: flex;
        border: 1Px solid #ddd;
        .item {
          flex-basis: 25%;
          font-size: 40px;
          text-align: center;
          line-height: 88px;
        }
        .item:not(:last-of-type) {
          border-right: 1Px solid #ddd;
        }
        input {
          position: absolute;
          height: 88px;
          opacity: 0;
          left: 0;
          width: 528px;
          color: red;
        }
      }

      .item1 {
        border-bottom: none;
      }
      .item2 {
        margin-top: 50px;
        display: flex;
        justify-content: space-around;
        line-height: 70px;
        button {
          width: 180px;
          line-height: 70px;
          background: linear-gradient(
            90deg,
            rgba(214, 174, 123, 1) 0%,
            rgba(238, 204, 153, 1) 100%
          );
          border-radius: 10px;
        }
        button:nth-of-type(2) {
          background: #aaa;
          color: #fff;
        }
      }
    }
  }
  .footBuy {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 24px;
    height: 90px;
    text-align: center;
    background-color: #fff;
    .box1 {
      padding: 10px 0;
      width: 254px;
      box-sizing: border-box;
      font-size: 28px;
      span {
        line-height: 30px;
        font-size: 32px;
        font-weight: 500;
        color: rgba(241, 15, 15, 1);
        line-height: 44px;
      }
    }
    .box2 {
      width: 496px;
      font-size: 24px;
      border-left: 1Px solid #ddd;
      button {
        width: 360px;
        height: 70px;
        background: linear-gradient(
          90deg,
          rgba(214, 174, 123, 1) 0%,
          rgba(234, 205, 163, 1) 100%
        );
        border-radius: 38px;
        font-size: 24px;
      }
    }
  }
}
</style>