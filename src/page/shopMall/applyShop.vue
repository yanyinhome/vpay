<template>
  <div id="applyShop">
    <com-head :opacity="1">申请店铺</com-head>
    <div class="userMessage" v-if="!applyStatus">
      <div class="item">
        <span>店铺名称</span>
        <input type="text" v-model="name" placeholder="请设置店铺名称">
      </div>
      <div class="item">
        <span>联系电话</span>
        <input type="text" v-model="phone" placeholder="请输入店家手机号">
      </div>
      <div class="item1">
        <span>店铺地址：</span>
      </div>
      <div class="beizhu">
        <textarea style="resize:none" border placeholder="请设置店铺地址" v-model="address" rows="5"></textarea>
      </div>
      <div class="box1" @click="portrait">
        <span>店铺头像</span>
        <input
          class="imginp"
          ref="portrait"
          name="imgLocal"
          id="imgLocal"
          type="file"
          accept="image/*"
          @change="shangchuan"
        >
        <div class="tou">
          <div class="touxiang">
            <img :src="yulan">
          </div>
          <i class="iconfont icon-next"></i>
        </div>
      </div>
      <div class="shop">
        <div class="item">
          <span>店铺类别</span>
          <input type="text" v-model="shoptype" placeholder="请选择店铺类别">
        </div>
        <div class="navbox">
          <div
            class="box"
            @click="navAcitive(item,index)"
            :class="{active: active==index}"
            v-for="(item,index) in nav"
            :key="index"
          >{{item.name}}</div>
        </div>
        <p>* 仅可选择一种类别</p>
      </div>
      <div class="warn">提醒：后台需要对店铺申请进行审核，1-3个工作日内审核完毕。</div>
      <com-button :click="submit">确定申请</com-button>
    </div>

    <div id="cookerCheck" v-if="applyStatus">
      <div class="box1">
        <img src="../../assets/image/shenhe.png">
      </div>
      <p>正在审核店铺</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "applyShop",
  data() {
    return {
      applyStatus: this.$route.query.applyStatus,
      active: "-1",
      yulan: "",
      picValue: "",
      imgbase: [],

      name: "",
      ia: "",
      shoptype: "",
      phone: "",
      address: "",
      nav: []
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading() {
      this.axios
        .post("/shop/app_view", {
          token: this.token()
        })
        .then(({ data }) => {
          
          if (data.code === "200") {
            this.nav = data.data;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submit() {
      let regTel = /^(1[3-9])\d{9}$/;
      if (!this.name) {
        this.$bus.$emit("toast", "请设置店铺名称");
      } else if (!this.phone) {
        this.$bus.$emit("toast", "手机号不能为空");
      } else if (!regTel.test(this.phone)) {
        this.$bus.$emit("toast", "手机号码不合法");
      } else if (!this.shoptype) {
        this.$bus.$emit("toast", "请选择的店铺类别");
      } else {
        this.axios
          .post("/shop/shop_application", {
            token: this.token(),
            shop_name: this.name,
            img: this.imgbase[0],
            flag: this.id,
            address: this.address,
            phone: this.phone
          })
          .then(({ data }) => {
            
            if (data.code === "200") {
              this.$bus.$emit("toast", data.msg);
              this.applyStatus = true;
            } else if (data.code === "204") {
              this.$bus.$emit("toast", data.msg);
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    // 头像单击事件
    portrait() {
      this.$refs.portrait.click(); // 获取ref为portrait的元素相当于获取id为portrait的元素
    },
    shangchuan(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue, "0");
    },
    navAcitive(item, index) {
      this.active = index;
      this.shoptype = item.name;
      this.id = item.id;
    }
  }
};
</script>
<style lang='scss' scoped>
#applyShop {
  padding-top: 100px;
  position: relative;
  background-color: #f6f6f6;
  .userMessage {
    width: 100%;
    box-sizing: border-box;
    color: #000;
    .box1 {
      padding: 0 30px;
      box-sizing: border-box;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // border-bottom: 1Px solid #eee;
      background-color: #fff;
      input {
        width: 300px;
        opacity: 0;
        filter: alpha(opacity=0);
      }
      span {
        line-height: 140px;
      }
      .tou {
        width: 140px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .touxiang {
          width: 100px;
          height: 100px;
          border-radius: 6px;
          overflow: hidden;
          img {
            width: 100%;
          }
        }
        .iconfont {
          font-size: 40px;
          color: #ddd;
        }
      }
    }
    .item {
      padding: 0 30px;
      box-sizing: border-box;
      // margin-top: 20px;
      border-bottom: 1Px solid #ddd;
      display: flex;
      justify-content: space-between;
      line-height: 100px;
      background-color: #fff;
      span {
        // width: 120px;
        text-align: left;
      }
      input {
        width: 450px;
        line-height: 90px;
        text-align: right;
        font-size: 30px;
        margin-right: 0;
        color: #666;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #888;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #888;
      }

      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #888;
      }

      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #888;
      }
    }
    .item1 {
      padding: 0 30px;
      line-height: 90px;
      font-size: 28px;
      background-color: #fff;
    }
    .beizhu {
      position: relative;
      // margin-bottom: 20px;
      text-align: center;
      background-color: #fff;
      textarea {
        width: 690px;
        margin: auto;
        padding: 10px;
        border: 1Px solid rgba(238, 238, 238, 1);
        box-sizing: border-box;
      }
    }
  }
  .shop {
    background-color: #fff;
    .item {
      margin: 20px 30px 0;
      padding: 0;
      border-bottom: 1Px solid #ddd;
    }
    .navbox {
      padding: 20px 16px 0;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .box {
        margin: 10px 14px;
        width: 147px;
        line-height: 60px;
        text-align: center;
        border-radius: 4px;
        border: 2px solid rgba(214, 174, 123, 1);
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(214, 174, 123, 1);
      }
      .active {
        background: rgba(214, 174, 123, 1);
        color: #fff;
      }
    }
    p {
      text-align: right;
      padding-right: 30px;
      font-size: 24px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(136, 136, 136, 1);
      line-height: 80px;
    }
  }
  .warn {
    margin-top: 20px;
    margin-bottom: 200px;
    padding: 0 30px;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 40px;
  }
  #cookerCheck {
    text-align: center;
    .box1 {
      width: 372px;
      height: 308px;
      margin: 0 auto;
      margin-top: 20vh;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    p:nth-of-type(1) {
      font-size: 30px;
      line-height: 100px;
    }
  }
}
</style>