<template>
  <div id="shopOrder">
    <com-head :opacity="1">订单管理</com-head>
    <div class="fixed">
      <div class="item">
        <span>
          <i class="iconfont icon-sousuo"></i>
        </span>
        <input type="text" v-model="search" placeholder="请输入商品名称">
      </div>
      <div class="nav">
        <div
          v-for="(item,index) in orderlist"
          :key="index"
          :class="{active: status==index}"
          @click="listSelect(index)"
        >
          {{item.name}}
          <span v-if="item.num>0">{{item.num}}</span>
        </div>
      </div>
    </div>

    <div class="order" v-for="(item,index) in message" :key="item.order_id">
      <div class="orderTop">
        <div class="box1">下单时间：{{item.order_create_time}}</div>
        <div class="box2">{{server[item.status]}}</div>
      </div>
      <div class="orderCenter">
        <div class="box1">
          <img :src="item.image1">
        </div>
        <div class="box2">
          <p>
            <span>{{item.book}}</span>
            <span>&yen;{{item.order_pay_price}}</span>
          </p>
          <p>
            <span>{{item.book_sign}}</span>
            <span>x{{item.number}}</span>
          </p>
          <p>{{item.book_sign}}</p>
        </div>
      </div>
      <div class="orderFoot">
        <div class="sumprice">共{{item.number}}件商品(包含运费) 合计：¥{{ item.number * item.order_pay_price}}</div>
        <button class="noborder" v-if="item.status=='1'">发货</button>
        <button v-if="item.status=='2'" @click="lookwuliu(index)">查看物流</button>
        <button
          class="evaluate"
          v-if="item.status=='3'"
          @click="surereceive(item.order_id,index)"
        >确定收货</button>
      </div>
    </div>
    <!-- 发货 -->
    <div class="mask" v-if="mask">
      <div class="box1">
        <div class="topmes">
          <div class="left">
            <img src="../../assets/image/shouhuo.png" alt>
          </div>
          <div class="right">
            <p>
              <span>买家姓名</span>
              <span>买家姓名</span>
            </p>
            <p>河南省郑州市金水区北三环瀚海北金</p>
          </div>
        </div>
        <div class="cenmes">
          <p>
            <span>商品名字</span>
            <span>x1</span>
          </p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
          <p class="gong">共计3件商品</p>
        </div>
        <div class="footmes">
          <p>订单编号：</p>
          <p>下单时间：22</p>
          <p>付款时间：</p>
        </div>
        <button class="btn" @click="submit">确定发货</button>

        <div class="close" @click="mask=false">
          <i class="iconfont icon-chahao"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "shopOrder",
  data() {
    return {
      mask: false,
      status: 0,
      search: "",
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
        },
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
        },
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
        },
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
        },
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
      ],
      server: [
        "",
        "待发货",
        "待收货",
        "交易已完成",
        "删除订单",
        "确认收货",
        "查看物流"
      ],
      orderlist: [
        {
          name: "全部",
          num: "0"
        },
        {
          name: "待发货",
          num: "1"
        },
        {
          name: "待收货",
          num: "0"
        },
        {
          name: "已完成",
          num: "99"
        }
      ]
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading("0");
  },

  methods: {
    loading(type) {
      this.axios
        .post("user/order", {
          token: this.token(),
          status: type
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.message = data.data;
          } else if (data.code === "201") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 删除订单
    delorder(id, index) {
      this.$bus.$emit("comAlert", {
        title: "确定删除",
        button: [
          {
            text: "确认",
            callback: () => {
              this.axios
                .post("user/orderout", {
                  order_id: id
                })
                .then(({ data }) => {
                  console.log(data);
                  if (data.code === "200") {
                    this.$bus.$emit("toast", data.msg);
                    this.message.splice(index, 1);
                  } else if (data.code === "201") {
                    this.$bus.$emit("toast", data.msg);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
    },
    // 确定收货
    surereceive(id, index) {
      this.$bus.$emit("comAlert", {
        title: "确定删除",
        button: [
          {
            text: "确认",
            callback: () => {
              this.axios
                .post("user/overorder", {
                  order_id: id
                })
                .then(({ data }) => {
                  console.log(data);
                  if (data.code === "200") {
                    this.$bus.$emit("toast", data.msg);
                    this.message.splice(index, 1);
                  } else if (data.code === "201") {
                    this.$bus.$emit("toast", data.msg);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
    },
    // 查看物流
    lookwuliu(index) {
      console.log(this.message[index].tracking_number);
      this.$bus.$emit("comAlert", {
        title: "物流单号",
        info: this.message[index].tracking_number,
        button: [
          {
            text: "确认",
            callback: () => {}
          }
        ]
      });
    },
    listSelect(index) {
      console.log(index);
      this.status = index;
      this.loading(index);
    }
  }
};
</script>
<style lang='scss' scoped>
#shopOrder {
  padding-top: 284px;
  background-color: #fff;
  .fixed {
    position: fixed;
    top: 82px;
    background-color: #fff;
    padding: 20px 0 0;
    .item {
      margin: 0px 30px;
      padding: 0 30px;
      box-sizing: border-box;
      line-height: 90px;
      background: rgba(235, 235, 235, 1);
      border-radius: 10px;
      span {
        font-size: 34px;
        color: #999;
      }
      input {
        padding-left: 10px;
        line-height: 90px;
        width: 550px;
        background: rgba(235, 235, 235, 1);
        font-size: 26px;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #999;
        font-size: 28px;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #999;
        font-size: 28px;
      }

      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999;
        font-size: 28px;
      }

      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #999;
        font-size: 28px;
      }
    }
    .nav {
      margin-top: 20px;
      width: 750px;
      height: 76px;
      background: #f8f8f8;
      display: flex;
      justify-content: space-around;
      align-items: center;
      z-index: 100;
      div {
        width: 25%;
        height: 76px;
        font-size: 26px;
        text-align: center;
        line-height: 75px;
        color: #666;
        position: relative;
        span {
          display: block;
          width: 34px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          border-radius: 17px;
          font-size: 16px;
          background: rgba(241, 15, 15, 1);
          color: #fff;
          position: absolute;
          top: 8px;
          right: 24px;
        }
      }
      .active {
        color: rgba(214, 174, 123, 1);
        border-bottom: 2px solid rgba(214, 174, 123, 1);
        box-sizing: border-box;
      }
    }
  }

  .order {
    width: 690px;
    margin: 10px auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    .orderTop {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      color: #666;
      line-height: 66px;
      border-bottom: 1px solid #f0f0f0;
      .box2 {
        color: #f10f0f;
      }
    }
    .orderCenter {
      margin: 20px 0px;
      display: flex;
      justify-content: space-between;
      //   align-items: center;
      .box1 {
        width: 130px;
        height: 130px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .box2 {
        width: 560px;
        margin-left: 30px;
        p:nth-of-type(1) {
          font-size: 28px;
          line-height: 40px;
          color: #000;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span:nth-of-type(2) {
            color: #999;
          }
        }
        p:nth-of-type(2) {
          font-size: 24px;
          color: #999;
          display: flex;
          justify-content: space-between;
          align-items: center;
          line-height: 40px;
        }
        p:nth-of-type(3) {
          font-size: 24px;
          color: #999;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          line-height: 60px;
        }
      }
    }
    .orderFoot {
      text-align: right;
      padding-bottom: 20px;
      box-sizing: border-box;
      font-size: 26px;
      border-bottom: 1px solid #cbcbcb;
      .sumprice {
        line-height: 70px;
        margin: 10px auto;
        text-align: right;
        color: rgba(34, 34, 34, 1);
        font-size: 26px;
      }
      button {
        margin: 20px 0 10px 20px;
        padding: 10px 20px;
        font-size: 26px;
        border-radius: 10px;
        color: rgb(0, 0, 0);
        background: rgba(214, 174, 123, 1);
      }
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: calc(100vh);
    z-index: 101;
    background: rgba(0, 0, 0, 0.5);
    .box1 {
      margin: 200px auto;
      width: 630px;
      padding-bottom: 10px;
      border-radius: 20px;
      background-color: #fff;
      position: relative;
      .topmes {
        margin: 0 30px;
        padding: 60px 0 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-bottom: 1px solid rgba(203, 203, 203, 1);
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
          width: 500px;
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
      .cenmes {
        height: 250px;
        overflow: auto;
        margin: 0 30px;
        border-bottom: 1px solid rgba(203, 203, 203, 1);
        padding: 10px 0;
        p:nth-of-type(1) {
          font-size: 26px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(136, 136, 136, 1);
          line-height: 50px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .gong {
          font-size: 26px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgb(0, 0, 0);
        }
      }
      .footmes {
        margin: 0 30px;
        padding: 10px 0;
        p {
          font-size: 28px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 50px;
        }
      }
      .btn {
        display: block;
        margin: 80px auto;
        width: 520px;
        height: 70px;
        background: linear-gradient(
          90deg,
          rgba(214, 174, 123, 1) 0%,
          rgba(234, 205, 163, 1) 100%
        );
        border-radius: 36px;
      }
      .close {
        width: 100px;
        line-height: 100px;
        text-align: center;
        position: absolute;
        right: 0px;
        top: 0px;
        .iconfont {
          font-size: 40px;
          color: #666;
        }
      }
    }
  }
}
</style>