<template>
  <div id="myCardlist">
    <com-head :opacity="1">我的银行卡</com-head>
    <!-- <div class="card" v-for="(item,index) in message" :key="index">
      <div class="left">
        <div class="img"><img :src="item.img" alt="" srcset=""></div>
      </div>
      <div class="right">
        <p>{{item.name}}</p>
        <p>{{item.type}}</p>
        <p>{{item.number}}</p>
      </div>
    </div>
    <div class="box">
        <span><i class="iconfont icon-add"/>&emsp;添加银行卡</span>
        <i class="iconfont icon-next"/>
    </div>-->
    <div class="outside">
      <!-- <div class="lunbo">
            <mt-swipe :auto="3000">
              <mt-swipe-item  v-for="(item,index) in images" :key="index"><img :src="item"></mt-swipe-item>
            </mt-swipe>
      </div>-->
      <div class="swiper-container" :options="swiperOption" ref="mySwiper" v-if="images.length>1">
        <div class="swiper-wrapper">
          <div
            class="swiper-slide"
            v-for="(item,index) in images"
            :key="index"
            data-history="index"
          >
            <img :src="item">
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- 如果需要滚动条 -->
        <div class="swiper-scrollbar"></div>
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
        require("../../assets/image/card3.png")
      ],
      swiperOption: {
        autoplay: {
          //自动播放
          delay: 2500,
          disableOnInteraction: false
        },
        loop: true, //环装轮播
        history: "love"
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
//  @import "../../static/css/swiper-3.4.0.min.css";
#myCardlist {
  padding-top: 112px;
  background-color: #fff;
  .outside {
    width: 690px;
    height: 100%;
    margin: 0 auto;
    // background-color: pink;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    .swiper-container {
      width: 550px;
      height: 390px;
      margin: 20px auto;
      img {
        width: 100%;
      }
    }
  }
  //  .card {
  //      padding-top: 30px;
  //      box-sizing: border-box;
  //      width:690px;
  //       height:232px;
  //       margin: auto;
  //       margin-top: 20px;
  //       background:rgba(227,93,93,1);
  //       box-shadow:0px -20px 0px 0px rgba(255,255,255,0.5);
  //       border-radius:10px;
  //   display: flex;
  //   justify-content: flex-start;
  //   // align-items: center;
  //   background-color: #fff;
  //   position: relative;
  //   .left{
  //       width: 170px;
  //       .img {
  //           margin: 0  auto;
  //       width:90px;
  //       height:90px;
  //       img {
  //           width: 100%;
  //       }
  //   }
  //   }
  //   .right {
  //       p:nth-of-type(1) {
  //       font-size:28px;
  //       font-family:PingFangSC-Medium;
  //       font-weight:500;
  //       color:#000;
  //       line-height:40px;
  //       }
  //       p:nth-of-type(2) {
  //       font-size:26px;
  //       font-family:PingFangSC-Medium;
  //       font-weight:500;
  //       color:#000;
  //       line-height:50px;
  //       }
  //       p:nth-of-type(3) {
  //           margin-top: 20px;
  //       font-size:32px;
  //       font-family:PingFangSC-Medium;
  //       font-weight:500;
  //       color:#000;
  //       line-height:40px;
  //       }
  //   }

  //  }
  //  .box {
  //     margin: 30px 0px;
  //     padding: 0 30px;
  //     color: #888;
  //     background-color: #2A2A2A;
  //     display: flex;
  //     justify-content: space-between;
  //     align-items: center;
  //     border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  //     line-height: 100px;

  //   }
  
}
</style>