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
            <span>买家姓名</span>
            <span>买家姓名</span>
          </p>
          <p>河南省郑州市金水区北三环瀚海北金</p>
        </div>
      </div>
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
    </div>
    <div class="user good">
      <div class="topmes">
        <div class="left">
          <img src="../../assets/image/shouhuo.png" alt>
        </div>
        <div class="right">
          <p>
            <span>买家姓名</span>
            <span>买家姓名</span>
          </p>
          <p>
            <span>&yen;38</span>
            <span>x1</span>
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
      <p>订单编号：</p>
      <p>下单时间：22</p>
      <p>付款时间：</p>
    </div>
    <div class="footmes">
      <p>订单状态：</p>
    </div>
    <div class="comAlert" v-show="show">
         <div class="alertbox">
             <div class="alerttop">
                 <div class="box1"><a href="`tel://${tel}`">{{tel}}</a></div>
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
      show: false,
      tel: '',
      tel: '',

    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
      telflat(){
          this.show = true;
          this.tel = 1111;
      },
      telbuyer(){
          this.show = true;
          this.tel = 2222;
      },
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
        background: rgba(216, 216, 216, 1);
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
      height: 211px;
      position: absolute;
      bottom: 20px;
      left: 32px;
      .alerttop {
        height: 101px;
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
            text-decoration:none; 
            color:#d6ae7b; 
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