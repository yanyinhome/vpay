<template>
  <div id="userMessage">
    <com-head :opacity="0">个人资料</com-head>
    <div class="keepdata" @click="keepdata">保存</div>
    <div class="userMessage">
      <div class="box1" @click="portrait">
        <span>头像</span>
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

      <div class="item">
        <span>手机号</span>
        <input type="text" v-model="phone" readonly="readonly">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userMessage",
  data() {
    return {
      phone: "",
      yulan: "",
      picValue: "",
      imgbase: []
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
        .post("user/upmessge", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.phone = data.data.phone;
            this.yulan = data.data.head_img;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    keepdata() {
      this.axios
        .post("user/editheadimg", {
          token: this.token(),
          head_img: this.imgbase[0]
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$router.push("index");
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
      this.imgPreview(this.picValue, "0");
    }
  }
};
</script>
<style lang='scss' scoped>
#userMessage {
  padding-top: 100px;
  position: relative;
  background-color: #fff;
  #pageHead {
    background-color: #fff;
    color: #000;
  }
  .keepdata {
    width: 160px;
    height: 80px;
    text-align: center;
    color: #d6ae7b;
    line-height: 80px;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 100;
  }
  .userMessage {
    width: 100%;
    // margin-top: 20px;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #fff;
    color: #000;
    .box1 {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1Px solid #eee;
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
          width: 80px;
          height: 80px;
          border-radius: 40px;
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
      display: flex;
      justify-content: space-between;
      line-height: 100px;
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
    }
    .item:nth-of-type(2) {
      border-bottom: 1Px solid #eee;
    }
  }
}
</style>