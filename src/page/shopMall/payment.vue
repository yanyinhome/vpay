<template>
  <div id="payment">
    <com-head :opacity="1"></com-head>
    <div class="myaddress" @click>
      <div class="left">
        <img src="../../assets/image/address.png" alt>
      </div>
      <div class="center">
        <p>
          <span>买家姓名</span>
        </p>
        <p>河南省郑州市金水区北三环瀚海北金</p>
      </div>
      <div class="right">
        <i class="iconfont icon-next"></i>
      </div>
    </div>
    <div class="order" v-for="(item,index) in message" :key="index">
      <div class="orderCenter">
        <div class="box1">
          <img :src="item.image1">
        </div>
        <div class="box2">
          <p>{{item.book}}</p>
          <p>{{item.book}}</p>
          <p>
            <span>{{item.book_sign}}</span>
            <span>x{{item.number}}</span>
          </p>
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
          maxlength="40"
          placeholder="请输入备注，最多40个字哦"
          v-model="content"
          cols="80"
          rows="3"
        ></textarea>
        <span class="number">{{number}}/40</span>
      </div>
    </div>
    <div class="footBuy">
      <div class="box1">实付：
        <span>&yen;999999</span>
      </div>
      <div class="box2">
        <button :disabled='disabled' @click="payTo">立即支付</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "payment",
  data() {
    return {
      content: "",
      number: "0",
      disabled: false,
      message: [
        {
          order_create_time: "120212",
          order_create_time: "120212",
          order_create_time: "120212",
          status: "2",
          book: "120212",
          book_sign: "120212",
          order_pay_price: "120212",
          number: "120212",
          image1: require("../../assets/image/zanshi/touxiang.jpg")
        }
      ]
    };
  },
  watch: {
    content: function(a, b) {
      this.number = a.length;
      console.log(this.number);
      if (this.number > 39) {
        this.$bus.$emit("toast", "字数不能超过50");
      }
    }
  },
  computed: {},

  created() {},

  mounted() {},

  methods: {
      payTo(){
        this.disabled = true;
        setTimeout(() => {
            this.disabled = false;
        }, 2000)
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
          font-size: 26px;
          color: #999;
          line-height: 40px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        p:nth-of-type(3) {
          font-size: 28px;
          color: #000;
          line-height: 60px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-of-type(1) {
            color: #f10f0f;
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