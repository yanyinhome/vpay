<template>
  <div id="myorder">
    <com-head :opacity="1">我的订单</com-head>
    <div class="nav">
      <div
        v-for="(item,index) in orderlist"
        :key="index"
        :class="{active: status==index}"
        @click="listSelect(index)"
      >{{item}}</div>
    </div>
    <div class="order" v-for="(item,index) in message" :key="item.order_id">
      <div class="orderCenter">
        <div class="box1">
          <img :src="item.imgurl">
        </div>
        <div class="box2">
          <p>{{item.goodsname}}</p>
          <p>{{item.content}}</p>
          <p>
            <span>&yen;{{item.price}}</span>
            <span>x{{item.num}}</span>
          </p>
        </div>
      </div>
      <div class="orderFoot">
        <!-- <div class="sumprice">共{{item.number}}件商品(包含运费) 合计：¥{{ item.number * item.order_pay_price}}</div> -->
        <button class="noborder" v-if="status=='0'">去付款</button>
        <!-- <button class="noborder" v-if="status=='1'" @click="warning(item.id)">提醒发货</button> -->
        <button v-if="status=='2'||status=='3'" @click="lookwuliu(item.id)">查看物流</button>
        <button class="noborder" v-if="status=='2'" @click="sureReceive(item.id)">确定收货</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "myorder",
  data() {
    return {
      mask: false,
      status: 0,
      search: "",
      message: [
     
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
      orderlist: ["待付款", "待发货", "待收货", "已完成"]
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading("1");
  },

  methods: {
    loading(type) {
      this.message = [];
      this.axios
        .post("shop/user_order", {
          token: this.token(),
          status: type
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.message = data.data.order;
          } else if (data.code === "201") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 提醒发货
    // warning(id) {
    //   this.$bus.$emit("comAlert", {
    //     info: "已提醒买家发货",
    //     button: [
    //       {
    //         text: "确认",
    //         callback: () => {
    //           this.axios
    //             .post("user/orderout", {
    //               order_id: id
    //             })
    //             .then(({ data }) => {
    //               console.log(data);
    //               if (data.code === "200") {
    //                 this.$bus.$emit("toast", data.msg);
    //                 this.message.splice(index, 1);
    //               } else if (data.code === "201") {
    //                 this.$bus.$emit("toast", data.msg);
    //               }
    //             })
    //             .catch(function(error) {
    //               console.log(error);
    //             });
    //         }
    //       }
    //     ]
    //   });
    // },
    // 确定收货
    sureReceive(id, index) {
      this.$bus.$emit("comAlert", {
        info: "确定收货?",
        button: [
          {
            text: "确认",
            callback: () => {
              this.axios
                .post("shop/confirm_goods", {
                  token: this.token(),
                  id: id
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
    lookwuliu(id) {
      this.axios
        .post("/shop/look_express", {
          token: this.token(),
          id: id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$bus.$emit("comAlert", {
              title: "物流单号",
              info: data.data,
              button: [
                {
                  text: "确认",
                  callback: () => {}
                }
              ]
            });
          } else if (data.code === "201") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    listSelect(index) {
      console.log(index);
      this.status = index;
      this.loading(index+1);
    }
  }
};
</script>
<style lang='scss' scoped>
#myorder {
  padding-top: 172px;
  background-color: #f6f6f6;
  .nav {
    position: fixed;
    top: 82px;
    width: 750px;
    height: 90px;
    background: #fff;
    color: #000;
    border-top: 1Px solid #cbcbcb;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 100;
    div {
      width: 22%;
      margin: 0 3%;
      height: 90px;
      font-size: 26px;
      text-align: center;
      line-height: 90px;
      color: #666;
      position: relative;
    }
    .active {
      color: rgba(214, 174, 123, 1);
      border-bottom: 4px solid rgba(214, 174, 123, 1);
      box-sizing: border-box;
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
      // align-items: center;
      border-bottom: 1Px solid #cbcbcb;
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
          width: 470px;
          font-size: 26px;
          color: #999;
          word-break: break-all;
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
        }
      }
    }
    .orderFoot {
      text-align: right;
      padding-bottom: 20px;
      box-sizing: border-box;
      font-size: 26px;
      .sumprice {
        line-height: 70px;
        margin: 10px auto;

        text-align: right;
        color: rgba(34, 34, 34, 1);
        font-size: 26px;
      }
      button {
        margin-left: 20px;
        padding: 5px 15px;
        font-size: 26px;
        color: rgb(0, 0, 0);
        background: rgba(255, 255, 255, 1);
        border-radius: 25px;
        border: 1Px solid rgba(151, 151, 151, 1);
      }
    }
  }
}
</style>