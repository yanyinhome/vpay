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
        <div :class="{active: status=='0'}" @click="listSelect1()">
          待付款
        </div>
        <div :class="{active: status=='1'}" @click="listSelect2()">
          待发货
          <span v-if="fa>0">{{fa}}</span>
        </div>
        <div :class="{active: status=='2'}" @click="listSelect3()">
          待收货
          <span v-if="shou>0">{{shou}}</span>
        </div>
        <div :class="{active: status=='3'}" @click="listSelect4()">
          已完成
        </div>
      </div>
     
    </div>
    <div v-if="!message.length" style="margin-top: 15vh; text-align: center;">暂无订单信息</div>
    <div class="order" v-for="(item,index) in message" :key="item.order_id">
      <div class="orderTop">
        <div class="box1">{{item.buyname}}</div>
        <div class="box2">{{orderlist[status]}}</div>
      </div>
      <div class="orderCenter">
        <div class="box1">
          <img :src="item.imgurl">
        </div>
        <div class="box2">
          <p>
            <span>{{item.goodsname}}</span>
            <span>&yen;{{item.price}}</span>
          </p>
          <p>
            <span>{{item.create_time}}</span>
            <span>x{{item.num}}</span>
          </p>
          <p>{{item.content}}</p>
        </div>
      </div>
      <div class="orderFoot">
        <div class="sumprice">共{{item.number}}件商品，合计：¥{{ item.num * item.price}}</div>
        <button class="noborder" @click="fahuoMes(item.id)" v-if="status=='1'">发货</button>
        <button v-if="status=='2'||status=='3'" @click="lookwuliu(index)">查看物流</button>
        <button
          class="evaluate"
          v-if="status=='3'"
          @click="surereceive(item.order_id,index)"
        >订单详情</button>
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
              <span>{{fahuomes.name}}</span>
              <span>{{fahuomes.phone}}</span>
            </p>
            <p>{{fahuomes.province+fahuomes.city+fahuomes.area+fahuomes.address}}</p>
          </div>
        </div>
        <div class="cenmes">
          <p>
            <span>{{fahuolist.goodname}}：{{fahuolist.price}}</span>
            <span>x{{fahuolist.num}}</span>
          </p>
          <!-- <p class="gong">共计3件商品</p> -->
        </div>
        <div class="footmes">
          <p>订单编号：{{fahuolist.order_number}}</p>
          <p>下单时间：{{fahuolist.create_time}}</p>
          <p>付款时间：{{fahuolist.pay_time}}</p>
        </div>
        <button class="btn" @click="sureFahuo">确定发货</button>

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
      status: '0',
      fa: '',
      shou: '',
      search: "",
      orderid: '', //订单id
      fahuomes: {},
      fahuolist: [],
      orderlist: ['待付款','待发货','待收货','已完成'],
      message: [
        // {
        //   order_create_time: "120212",
        //   order_create_time: "120212",
        //   order_create_time: "120212",
        //   status: "2",
        //   book: "120212",
        //   book_sign: "120212",
        //   order_pay_price: "120212",
        //   number: "120212",
        //   image1: require("../../assets/image/zanshi/touxiang.jpg")
        // },
        
      ],
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading("1");
  },

  methods: {
    loading(type) {
      this.axios
        .post("/shop/order_list", {
          token: this.token(),
          status: type
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.message = data.data.order;
            this.fa = data.data.fa;
            this.shou= data.data.shou;
          } else if (data.code === "201") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.fa = data.data.fa;
            this.shou= data.data.shou;
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 发货
    fahuoMes(id){
      this.orderid = id;
      this.mask = true;
      this.axios
        .post("/shop/fahuoview", {
          token: this.token(),
          id: id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.fahuomes = data.data.address;
            this.fahuolist = data.data.order;
          } else if (data.code === "201") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    sureFahuo(){

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
    listSelect1() {
      this.loading('1');  
      this.status = '0';
    },
    listSelect2() {
      this.loading('2');  
      this.status = '1';
    },
    listSelect3() {
      this.loading('3');
      this.status = '2';
    },
    listSelect4() {
      this.loading('4');
      this.status = '3';
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
      border-bottom: 1Px solid #f0f0f0;
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
      border-bottom: 1Px solid #cbcbcb;
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
        border-bottom: 1Px solid rgba(203, 203, 203, 1);
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
        // height: 250px;
        overflow: auto;
        margin: 0 30px;
        border-bottom: 1Px solid rgba(203, 203, 203, 1);
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