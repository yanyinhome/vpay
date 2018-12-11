<template>
  <div id="myCardlist">
    <com-head :opacity="1">我的银行卡</com-head>
    <div class="keepdata" @click="keepdata"><img src="../../assets/image/addcard.png"></div>
    <div class="outside">
      <p>我的银行卡</p>
      <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiperSlide v-for="(item,index) in images" :key="index">
          <img class="swiper-slid_img" :src="item" data-history="index">
        </swiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- Optional controls -->
      </swiper>
    </div>
    <div class="message" border>
      <p>银行卡信息</p>
      <!-- <div class="item"><span>开户行</span></div>
      <div class="item"><span>支行名称</span></div>
      <div class="item"><span>持卡人姓名</span></div>
      <div class="item"><span>银行卡号</span></div>-->
      <table border="1" width="100%" rules="none" frame="void" cellspacing="0">
        <tr>
          <td width="30%">开户行</td>
          <td width="70%"></td>
        </tr>
        <tr>
          <td width="30%">支行名称</td>
          <td width="70%"></td>
        </tr>
        <tr>
          <td width="30%">持卡人姓名</td>
          <td width="70%"></td>
        </tr>
        <tr>
          <td width="30%">银行卡号</td>
          <td width="70%"></td>
        </tr>
      </table>
      <button @click="mask=true">删除银行卡</button>
    </div>
    <div class="mask" v-if="mask">
      <div class="box">
        <button @click="deleteCard">确定删除银行卡</button>
        <button @click="mask=false">取消</button>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "myCardlist",
  data() {
    return {
      mask: false,
      message: [
        {
          img: require("../../assets/image/zanshi/card.png"),
          name: "农行",
          type: "储蓄卡",
          number: "888888"
        },
        {
          img: require("../../assets/image/zanshi/card.png"),
          name: "农行",
          type: "储蓄卡",
          number: "888888"
        },
        {
          img: require("../../assets/image/zanshi/card.png"),
          name: "农行",
          type: "储蓄卡",
          number: "888888"
        }
      ],
      images: [
        require("../../assets/image/card1.png"),
        require("../../assets/image/card2.png"),
        require("../../assets/image/card3.png"),
        require("../../assets/image/card4.png"),
      ],
      // swiper配置
      swiperOption: {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 500,
          stopOnLastSlide: true
        },
        activeIndex: false,
        notNextTick: true,
        autoplay: true,
        loop: true,
        autoplayDisableOnInteraction: false
      },
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {},

  created() {
    console.log(swiperSlide.activeIndex);
    this.loading();
  },

  mounted() {},

  methods: {
    loading(){
      this.axios.post('/user/banklist',{
        token: this.token()
				})
				.then(({data})=>{
          console.log(data);
					if (data.code=='200'){
            this.message = data.data;        						
					} else if(data.code=='204'){
						this.$bus.$emit('toast', data.msg);	
					}
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteCard() {

    },
    keepdata(){

    }
  }
};
</script>
<style lang='scss' scoped>
@import url(../../assets/scss/swiper-3.4.0.min.css);
#myCardlist {
  padding-top: 112px;
  background-color: #fff;
  .keepdata {
    width: 160px;
    height: 80px;
    text-align: center;
    color: #D6AE7B;
    line-height: 80px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
    img {
      margin-top: 20px;
      height: 60%;
    }
  }
  .outside {
    width: 690px;
    height: 100%;
    margin: 0 auto;
    // background-color: pink;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    p {
      font-size: 32px;
      font-weight: 500;
    }
    .swiper-container {
      width: 550px;
      height: 390px;
      margin: 20px auto;
      img {
        width: 100%;
      }
    }
  }
  .message {
    width: 630px;
    height: 266px;
    margin: auto;
    margin-top: 100px;
    p {
      text-align: center;
      line-height: 80px;
      font-size: 26px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.9);
    }
    // border:1px solid rgba(221,221,221,1);
    table,
    tr {
      border: 1px solid rgba(221, 221, 221, 1);
      line-height: 70px;
    }
    td {
      padding-left: 10px;
      box-sizing: border-box;
    }
    button {
      width: 400px;
      height: 76px;
      display: block;
      margin: 64px auto;
      font-size: 26px;
      color: #fff;
      background: linear-gradient(
        270deg,
        rgba(255, 220, 182, 1) 0%,
        rgba(214, 174, 123, 1) 100%
      );
      border-radius: 38px;
    }
  }
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 50;
    background: rgba(0, 0, 0, 0.6);
    .box {
      position: absolute;
      bottom: 3%;
      left: 16px;
      button {
        width: 718px;
        height: 112px;
        background: rgba(248, 248, 248, 0.82);
        border-radius: 28px;
        font-size: 34px;
      }
      button:nth-of-type(1) {
        margin-bottom: 16px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(241, 0, 0, 1);
      }
    }
  }
}
</style>