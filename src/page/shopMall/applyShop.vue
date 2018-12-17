<template>
  <div id="applyShop">
    <com-head :opacity="1">申请店铺</com-head>
    <div class="userMessage">
      <div class="item">
        <span>店铺名称</span>
        <input type="text" v-model="name" placeholder="请设置店铺名称">
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
        <span>请选择店铺类别</span>
        <input type="text" v-model="name" placeholder="请选择店铺类别">
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "applyShop",
  data() {
    return {
      name: "",
      yulan: "",
      picValue: "",
      newimg: ""
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
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
#applyShop {
  padding-top: 100px;
  position: relative;
  background-color: #f6f6f6;
  #pageHead {
    background-color: #fff;
    color: #000;
  }
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
      border-bottom: 1px solid #eee;
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
      padding: 0 30px;
      box-sizing: border-box;
      margin-top: 20px;
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
    .item:nth-of-type(2) {
      border-bottom: 1px solid #eee;
    }
    .shop {
      background-color: #fff;
      .item {
          border-bottom: 1px solid #000;
      }
  }
  }
  
}
</style>