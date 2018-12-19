<template>
  <div id="uploadImg">
    <com-head :opacity="0">订单详情</com-head>
    <div class="detailhead">
      <div class="headimg">买</div>
      <p>买入余额数量</p>
      <p>{{num}}</p>
      <p>
        实付金额：
        <span>{{price}}</span>
      </p>
    </div>
    <div class="message">
      <p>交易信息</p>
      <div class="item">
        <span>UID</span>
        <span>{{sell_UID}}</span>
      </div>
      <div class="item">
        <span>手机号</span>
        <span>{{phone}}</span>
      </div>
      <div class="item">
        <span>持卡人</span>
        <span>{{bank_name}}</span>
      </div>
      <div class="item">
        <span>开户支行</span>
        <span>{{bank_address}}</span>
      </div>
      <div class="item">
        <span>交易银行</span>
        <span>{{open_bank}}</span>
      </div>
      <div class="item">
        <span>银行卡账户</span>
        <span>{{bank_num}}</span>
      </div>
      <p>打款截图</p>
    </div>
    <div class="uploadbox">
      <p>* 完成打款后请上传打款截图，以作为打款凭证</p>
      <div class="upload" @click="portrait">
        <div class="yulan" v-if="yulan">
          <img :src="yulan">
        </div>
        <input
          class="imginp"
          ref="portrait"
          name="imgurl"
          id="imgurl"
          type="file"
          accept="image/*"
          @change="shangchuan"
        >
        <div class="box" v-if="!yulan">
          <i class="iconfont icon-add"></i>
          <span>上传截图</span>
        </div>
      </div>
    </div>
    <com-button :click="submitImg">提交</com-button>
  </div>
</template>

<script>
export default {
  name: "uploadImg",
  data() {
    return {
      id: this.$route.query.id,
      num: "",
      price: "",
      sell_UID: "",
      phone: "",
      open_bank: "",
      bank_num: "",
      bank_name: "",
      bank_address: "",

      yulan: "",
      picValue: "",
      newimg: ""
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
        .post("transaction/dakuanview", {
          token: this.token(),
          id: this.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.num = data.data.num;
            this.price = data.data.price;
            this.phone = data.data.phone;
            this.sell_UID = data.data.sell_UID;
            this.open_bank = data.data.open_bank;
            this.bank_num = data.data.bank_num;
            this.bank_name = data.data.bank_name;
            this.bank_address = data.data.bank_address;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    submitImg() {
      this.axios
        .post("transaction/dakuan", {
          token: this.token(),
          id: this.id,
          imgurl: this.newimg
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$router.go(-1);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 头像单击事件
    portrait() {
      this.$refs.portrait.click(); // 获取ref为portrait的元素相当于获取id为portrait的元素
    },
    shangchuan(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue);
    }
  }
};
</script>
<style lang='scss' scoped>
#uploadImg {
  padding-top: 82px;
  color: #fff;
  background-color: #fff;
  .detailhead {
    width: 750px;
    height: 296px;
    margin: 0 auto;
    padding-top: 40px;
    box-sizing: border-box;
    padding-bottom: 20px;
    text-align: center;
    background-color: #14171a;
    .headimg {
      margin: 0 auto;
      width: 60px;
      height: 60px;
      line-height: 60px;
      border-radius: 30px;
      background-color: #ec0000;
    }
    p:nth-of-type(1) {
      margin-top: 20px;
      font-size: 26px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
      line-height: 40px;
    }
    p:nth-of-type(2) {
      font-size: 28px;
      line-height: 60px;
    }
    p:nth-of-type(3) {
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
      line-height: 40px;
      span {
        color: #fff;
      }
    }
  }
  .message {
    background-color: #f6f6f6;
    color: #000;
    p {
      padding: 0 30px;
      box-sizing: border-box;
      font-size: 28px;
      line-height: 74px;
    }
    .item {
      padding: 0 30px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fff;
      line-height: 60px;
      span:nth-of-type(1) {
        font-size: 28px;
        font-family: PingFangSC-Regular;
        color: rgba(102, 102, 102, 1);
      }
      span:nth-of-type(2) {
        font-size: 28px;
        font-family: PingFangSC-Regular;
        color: rgba(0, 0, 0, 1);
      }
    }
    .item:nth-of-type(1) {
      padding-top: 10px;
    }
    .item:nth-of-type(6) {
      padding-bottom: 10px;
    }
  }
  .uploadbox {
    p {
      font-size: 24px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(236, 0, 0, 1);
      line-height: 100px;
      padding-left: 30px;
    }
    .upload {
      width: 560px;
      height: 320px;
      margin: auto;
      border-radius: 10px;
      border: 1px dashed rgba(153, 153, 153, 1);
      .yulan {
        width: 560px;
        height: 320px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: scroll;
        img {
          width: 100%;
        }
      }
      input {
        width: 10px;
        opacity: 0;
        filter: alpha(opacity=0);
      }
      .box {
        margin: 40px auto;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        span {
          margin-top: 20px;
          font-size: 28px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 60px;
        }
        .iconfont {
          font-size: 100px;
          font-weight: 700;
          color: rgba(153, 153, 153, 1);
        }
      }
    }
  }
}
</style>