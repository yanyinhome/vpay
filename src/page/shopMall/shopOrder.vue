<template>
  <div id="shopOrder">
    <com-head :opacity="1">订单管理</com-head>
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
            {{item.book}}
            <i class="iconfont icon-xiayi"/>
          </p>
          <p>{{item.book_sign}}</p>
        </div>
        <div class="box3">
          <p>&yen;{{item.order_pay_price}}</p>
          <p>x{{item.number}}</p>
        </div>
      </div>
      <div class="orderFoot">
        <div class="sumprice">共{{item.number}}件商品 合计：¥{{ item.number * item.order_pay_price}}</div>
        <button class="noborder" v-if="item.status=='1'">已下单，等待商家发货</button>
        <button v-if="item.status=='2'" @click="lookwuliu(index)">查看物流</button>
        <button
          class="evaluate"
          v-if="item.status=='2'"
          @click="surereceive(item.order_id,index)"
        >确定收货</button>
        <button v-if="item.status=='3'" @click="delorder(item.order_id,index)">删除订单</button>
      </div>
    </div>
    <!-- 发货 -->
    <div class="mask" v-if="mask">
      <div class="box1">

      </div>
      <div class="box3">
        <button @click="sureReceive">确认收款</button>
        <button @click="mask=false">取消</button>
      </div>
      <div class="box2" @click="mask=false">
        <i class="iconfont icon-chahao"></i>
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
      search: '',
      message: [],
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
  padding-top: 82px;
  background-color: #fff;
  .item {
    margin: 20px 30px;
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
    position: fixed;
    top: 216px;
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
  .order {
    width: 690px;
    margin: 10px auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    .orderTop {
      margin: 0 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      color: #666;
      line-height: 66px;
      .box2 {
        color: #ff7a13;
      }
    }
    .orderCenter {
      margin: 20px 30px;
      display: flex;
      justify-content: space-between;
      //   align-items: center;
      .box1 {
        width: 120px;
        height: 156px;
        border-radius: 6px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .box2 {
        width: 300px;
        margin-left: 30px;
        p:nth-of-type(1) {
          margin-top: 10px;
          font-size: 30px;
          line-height: 40px;
          color: #222;
        }
        p:nth-of-type(2) {
          font-size: 24px;
          color: #666;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      .box3 {
        width: 160px;
        text-align: right;
        color: #666;
        font-size: 28px;
        p:nth-of-type(1) {
          margin-top: 10px;
          color: #222;
          font-size: 24px;
        }
      }
    }
    .orderFoot {
      text-align: right;
      margin: 0px 30px;
      padding-bottom: 20px;
      box-sizing: border-box;
      font-size: 26px;
      .sumprice {
        line-height: 70px;
        margin: 10px auto;
        border-bottom: 1px solid #f6f6f6;
        text-align: right;
        color: rgba(34, 34, 34, 1);
        font-size: 26px;
      }
      button {
        margin: 20px 0 10px 20px;
        background: none;
        padding: 10px 20px;
        font-size: 26px;
        border-radius: 24px;
        color: #999;
        border: 1px solid #999;
      }
      .evaluate {
        color: #ff7a13;
        border: 1px solid #ff7a13;
      }
      .noborder {
        color: #999;
        border: none;
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
    background: rgba(4, 4, 15, 0.8);
    .box1 {
      margin: 300px auto;
      width: 70vw;
      height: 10vh;
      min-height: 50vh;
      border-radius: 10px;
      overflow-y: scroll;
      img {
        width: 100%;
      }
    }
    .box2 {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      position: fixed;
      top: 120px;
      right: 60px;
      color: #fff;
      .iconfont {
        font-size: 60px;
      }
    }
    .box3 {
      position: fixed;
      bottom: 20vh;
      left: 120px;
      // margin: 0px auto;
      button {
        margin: auto;
        padding: 0 10px;
        width: 200px;
        font-size: 26px;
        line-height: 60px;
        background: linear-gradient(
          90deg,
          rgba(214, 174, 123, 1) 0%,
          rgba(238, 204, 153, 1) 100%
        );
        border-radius: 6px;
        color: #fff;
      }
      button:nth-of-type(2) {
        margin-left: 100px;
        background: rgb(156, 156, 156);
      }
    }
  }
}
</style>