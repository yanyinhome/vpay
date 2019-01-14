<template>
  <div id="myCardlist">
    <com-head :opacity="1">我的银行卡
      <div class="keepdata" @click="keepdata">
        <img src="../../assets/image/addcard.png">
      </div>
    </com-head>
    <div class="cardmes" v-if="show">
      <div class="outside">
        <p>我的银行卡</p>
        <div class="lunbo">
          <div class="number">{{bankmes.bank_num}}</div>
          <swiper :options="swiperOption" ref="mySwiper">
            <swiperSlide v-for="(item,index) in images" :key="index">
              <img class="swiper-slid_img" :src="item">
            </swiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </div>

        <div class="moren" @click="checkbox">
          <i v-if="bankmes.default_bank" class="iconfont icon-fuxuankuang"/>
          <i v-if="!bankmes.default_bank" class="iconfont icon-fangkuang"/>&nbsp;
          <span v-if="bankmes.default_bank">默认银行卡</span>
          <span v-if="!bankmes.default_bank">设置为默认银行卡</span>
        </div>
      </div>
      <div class="message" border>
        <p>银行卡信息</p>
        <table border="1" width="100%" rules="none" frame="void" cellspacing="0">
          <tr>
            <td width="30%">开户行</td>
            <td width="70%">{{bankmes.open_bank}}</td>
          </tr>
          <tr>
            <td width="30%">支行名称</td>
            <td width="70%">{{bankmes.bank_address}}</td>
          </tr>
          <tr>
            <td width="30%">持卡人姓名</td>
            <td width="70%">{{bankmes.bank_name}}</td>
          </tr>
          <tr>
            <td width="30%">银行卡号</td>
            <td width="70%">{{bankmes.bank_num}}</td>
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
    <div class="mesnull" v-if="!images.length">暂无信息</div>
  </div>
</template>

<script>
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "myCardlist",
  data() {
    let that = this;
    return {
      show: false,
      checkbox1: true,
      checkbox2: false,
      mask: false,
      bankmes: {},
      bankIndex: "0",
      lengthmes: "", //数据长度
      message: [],
      images: [],
      img: [
        require("../../assets/image/card1.png"),
        require("../../assets/image/card2.png"),
        require("../../assets/image/card3.png"),
        require("../../assets/image/card4.png")
      ],
      // swiper配置
      swiperOption: {
        direction: "horizontal",
        pagination: {
          el: ".swiper-pagination",
          type: "fraction"
        },
        // autoplay: {
        //   delay: 500,
        //   stopOnLastSlide: true
        // },
        // loop: true,
        // centerInsufficientSlides: true,
        // slidesOffsetBefore : 30,
        // slidesOffsetAfter : 30,
        slidesPerView: 1,
        spaceBetween: 20,
        centeredSlides: true,
        notNextTick: true,
        autoplayDisableOnInteraction: true,

        on: {
          slideChangeTransitionStart() {
            // console.log(this.activeIndex);
            that.bankmes = that.message[this.activeIndex];
            that.bankIndex = this.activeIndex;
            // console.log(that.message[this.activeIndex]);
          }
        }
      }
    };
  },
  components: {
    swiper,
    swiperSlide
  },
  computed: {},

  created() {
    this.loading();
  },

  mounted() {},

  methods: {
    // 从图片列表随机取出数据
    takeout() {
      this.message.forEach((element, index) => {
        const img = this.img[Math.floor(Math.random() * 4)];
        this.images.push(img);
      });
      // console.log(this.images);
    },
    loading() {
      this.axios
        .post("user/banklist", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.show = true;
            this.message = data.data;
            this.lengthmes = data.data.length;
            this.bankmes = this.message[0];
            this.takeout();
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    deleteCard() {
      console.log(this.bankIndex);
      this.axios
        .post("user/delbank", {
          token: this.token(),
          id: this.bankmes.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.mask = false;
            this.$router.go(0);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code == "204") {
            this.mask = false;
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    checkbox() {
      this.bankmes.default_bank = !this.bankmes.default_bank;
      if (this.bankmes.default_bank) {
        this.$bus.$emit("comAlert", {
          title: "温馨提示",
          info: "你确定将此银行卡设置为默认",
          button: [
            {
              text: "确认",
              callback: () => {
                this.axios
                  .post("user/setdefbank", {
                    token: this.token(),
                    id: this.bankmes.id
                  })
                  .then(({ data }) => {
                    console.log(data);
                    if (data.code === "200") {
                      this.$router.go(0);
                      this.$bus.$emit("toast", data.msg);
                    } else if (data.status === "204") {
                      this.$bus.$emit("toast", data.msg);
                    }
                  });
              }
            },
            {
              text: "取消",
              callback: () => {}
            }
          ]
        });
      }
    },
    keepdata() {
      this.$router.push("addCard");
    }
  }
};
</script>
<style lang='scss'>
// @import url(../../assets/scss/swiper-3.4.0.min.css);
#myCardlist {
  padding-top: 82px;
  background-color: #fff;
  .keepdata {
    width: 160px;
    height: 80px;
    text-align: center;
    color: #d6ae7b;
    line-height: 80px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
    img {
      margin-top: 20px;
      height: 55%;
    }
  }
  .outside {
    width: 750px;
    // height: 604px;
    margin: 0 auto;
    padding-bottom: 2px;
    background: url("../../assets/image/cardbg.png") no-repeat;
    background-size: 100% 100%;
    p {
      padding-left: 30px;
      padding-top: 30px;
      box-sizing: border-box;
      font-size: 32px;
      font-weight: 500;
    }
    .lunbo {
      position: relative;
      .number {
        color: #fff;
        font-size: 40px;
        position: absolute;
        bottom: 144px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9;
      }
      .swiper-pagination {
        color: rgb(226, 168, 92);
        // bottom: 90px;
        font-size: 26px;
        z-index: 100;
      }
      .swiper-container {
        width: 650px;
        margin: 20px auto 0;
        img {
          width: 100%;
        }
      }
    }
    .moren {
      margin-bottom: 50px;
      box-sizing: border-box;
      text-align: center;
      font-size: 12px;
      .iconfont {
        color: #979797;
        font-size: 30px;
        box-sizing: border-box;
      }
      .icon-fuxuankuang {
        color: #eacda3;
        font-size: 26px;
        box-sizing: border-box;
      }
    }
  }
  .message {
    width: 630px;
    height: 266px;
    margin: auto;
    margin-top: 10px;
    p {
      text-align: center;
      line-height: 80px;
      font-size: 26px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 0.9);
    }
    // border:1Px solid rgba(221,221,221,1);
    table,
    tr {
      border: 1Px solid rgba(221, 221, 221, 1);
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
  .mesnull {
    font-size: 32px;
    text-align: center;
    margin-top: 30vh;
  }
}
</style>