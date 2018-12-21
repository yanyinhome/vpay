<template>
  <div id="modifyShopname">
    <com-head :opacity="0">修改店铺名</com-head>
    <div class="keepdata" @click="keepdata">保存</div>
    <div class="modifyShopname">
      <div class="item">
        <span>店铺名称</span>
        <input type="text" v-model="nmae" placeholder="请输入店铺名">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modifyShopname",
  data() {
    return {
      nmae: ''
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
            this.nmae = data.data.nmae;
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
          head_img: this.newimg
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
    
  }
};
</script>
<style lang='scss' scoped>
#modifyShopname {
  padding-top: 100px;
  position: relative;
  background-color: #f6f6f6;
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
  .modifyShopname {
    width: 100%;
    // margin-top: 20px;
    padding: 0 30px;
    box-sizing: border-box;
    background-color: #fff;
    color: #000;
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