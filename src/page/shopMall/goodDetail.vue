<template>
  <div id="goodDetail">
    <div class="gone" @click="gone">
      <img src="../../assets/image/gone.png">
    </div>
    <div class="lunbo">
      <swiper :options="swiperOption" ref="mySwiper">
        <swiperSlide v-for="(item,index) in images" :key="index">
          <img class="swiper-slid_img" :src="item">
        </swiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
      <p>
        <span>{{goods.name}}</span>
        <span>￥{{goods.price}}</span>
      </p>
      <p>{{goods.content}}</p>
    </div>
    <div class="user">
      <router-link class="boxmes" tag="div" :to="{name:'shopDetail',query:{shopid: shop.id}}">
        <div class="left">
          <img :src="shop.img">
        </div>
        <div class="right">
          <p>
            <span>{{shop.shop_name}}</span>
            <span>进入店铺</span>
          </p>
          <p>申请时间：{{shop.create_time}}</p>
        </div>
      </router-link>
    </div>
    <div class="detail">——&nbsp;商品详情&nbsp;——</div>
    <div class="footBuy">
      <router-link class="box1" tag="div" :to="{name:'shopDetail',query:{shopid: shop.id}}">
        <i class="iconfont icon-dianpu1"/>
        <p>店铺</p>
      </router-link>
      <div class="box2">
        <button @click="buyTopay">立即购买</button>
      </div>
    </div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "goodDetail",
  data() {
    return {
      id: this.$route.query.id,
      goods: {},
      shop: {},
      images: [],
      // swiper配置
      swiperOption: {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        slidesPerView: 1,
        centeredSlides: true,
        notNextTick: true,
        autoplayDisableOnInteraction: true
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {},

  created() {},

  mounted() {
    this.loading();
  },
  methods: {
    //商品详情
    loading() {
      this.axios
        .post("/shop/goods_info", {
          token: this.token(),
          id: this.$route.query.id
        })
        .then(({ data }) => {
          
          if (data.code == "200") {
            this.images = data.data.imgurl;
            this.shop = data.data.shop;
            this.goods = data.data.goods;
            this.id = data.data.goods.id;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    buyTopay() {
      this.$router.push({ name: "payment", query: { id: this.id } });
    },
    gone() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang='scss' scoped>
#goodDetail {
  background-color: #f6f6f6;
  color: #000;
  .gone {
    width: 60px;
    height: 60px;
    top: 50px;
    left: 20px;
    position: fixed;
    z-index: 9999;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .lunbo {
    margin-top: 30px;
    width: 750px;
    //  height: 750px;
    background-color: #fff;
    .swiper-pagination {
      font-size: 26px;
      z-index: 100;
    }
    .swiper-container {
      width: 690px;
      height: 690px;
      img {
        width: 100%;
        vertical-align: middle;
        height: 100%;
      }
    }
    p:nth-of-type(1) {
      margin-top: 20px;
      padding: 0 30px;
      font-size: 30px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #f10f0f;
      display: flex;
      justify-content: space-between;
      span:nth-of-type(1) {
        width: 550px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        color: #000;
      }
    }
    p:nth-of-type(2) {
      // width: 550px;
      padding: 10px 30px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
  }
  .user {
    margin: 20px 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 2px 20px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    .boxmes {
      padding: 30px;
      display: flex;
      justify-content: space-between;
      //   align-items: center;
      .left {
        margin-right: 20px;
        width: 120px;
        height: 120px;
        border-radius: 2px;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        width: 480px;
      }
      .right p:nth-of-type(1) {
        font-size: 30px;
        line-height: 50px;
        display: flex;
        justify-content: space-between;
        span:nth-of-type(2) {
          margin-top: 10px;
          text-align: center;
          color: #fff;
          width: 160px;
          height: 50px;
          background: rgba(42, 42, 42, 1);
          border-radius: 25px;
          font-size: 24px;
        }
      }
      .right p:nth-of-type(2) {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 40px;
      }
    }
  }
  .detail {
    text-align: center;
    line-height: 74px;
    font-size: 24px;
    color: rgba(136, 136, 136, 1);
    background: rgba(255, 255, 255, 1);
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
      width: 186px;
      box-sizing: border-box;
      .iconfont {
        font-size: 44px;
        line-height: 50px;
        color: rgba(102, 102, 102, 1);
      }
      p {
        line-height: 30px;
        color: rgba(102, 102, 102, 1);
      }
    }
    .box2 {
      width: 564px;
      font-size: 24px;
      border-left: 1Px solid rgba(153, 153, 153, 1);
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