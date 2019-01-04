<template>
  <div id="addGoods">
    <com-head :opacity="1">{{title}}</com-head>
    <div class="addmes">
      <div class="item">
        <span>商品名称：</span>
        <input type="text" v-model="name" placeholder="请输入商品名称">
      </div>
      <div class="item">
        <span>商品价格：</span>
        <input type="text" v-model="price" placeholder="请输入商品价格">
      </div>
      <div class="item">
        <span>库存数量：</span>
        <input type="text" v-model="num" placeholder="请输入库存数量">
      </div>
      <div class="item1">
        <span>商品描述：</span>
      </div>
      <div class="beizhu">
        <textarea
          style="resize:none"
          border
          maxlength="50"
          placeholder="请输入商品描述"
          v-model="content"
          cols="80"
          rows="5"
        ></textarea>
        <span class="number">{{number}}/50</span>
      </div>
    </div>
    <div class="item2">
      <span>为了更好的展示商品，请上传长宽比例为1:1的图片。（点击图片，可删除替换）</span>
    </div>
    <div class="imglist">
      <div
        class="upload uploadyulan"
        @click="delectImg(index)"
        v-for="(item,index) in imgurl"
        :key="index"
      >
        <img :src="item">
      </div>
      <div class="upload" @click="portrait1" v-if="imgurl.length<6">
        <input
          class="imginp"
          ref="portrait1"
          name="imgurl"
          id="imgurl"
          type="file"
          accept="image/*"
          @change="shangchuan1"
        >
        <div class="add">
          <i class="iconfont icon-add"/>
        </div>
      </div>
    </div>
    <com-button :click="submitTo">上传商品</com-button>
  </div>
</template>

<script>
export default {
  name: "addGoods",
  data() {
    return {
      title: "",
      yulan: "",
      picValue: "",
      imgbase: [],

      imgurl: [],
      imgid: [],

      name: "",
      price: "",
      num: "",
      content: "",
      number: "0",

      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  watch: {
    content: function(a, b) {
      this.number = a.length;
      if (this.number > 49) {
        this.$bus.$emit("toast", "字数不能超过50");
      }
    }
  },
  computed: {},

  created() {
    if (this.$route.query.id) {
      //编辑商品
      this.title = "编辑商品";
      this.loading();
    } else {
      //添加商品
      this.title = "添加商品";
    }
  },

  mounted() {},

  methods: {
    loading() {
      this.axios
        .post("/shop/edit_goodsview", {
          token: this.token(),
          id: this.$route.query.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.name = data.data.goods.name;
            this.price = data.data.goods.price;
            this.num = data.data.goods.stock;
            this.content = data.data.goods.content;
            data.data.imgurl.forEach(element => {
              this.imgurl.push(element.imgurl);
              this.imgid.push(element.id);
            });
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    submitTo() {
      // console.log(!this.imgid.join());
      if (!this.name) {
        this.$bus.$emit("toast", "商品名不能为空");
      } else if (!this.price) {
        this.$bus.$emit("toast", "请设置商品价格");
      } else if (!this.num) {
        this.$bus.$emit("toast", "请设置商品库存");
      } else if (!this.content) {
        this.$bus.$emit("toast", "请输入商品描述");
      } else if (!this.imgid.join()) {
        this.$bus.$emit("toast", "请上传商品图片");
      } else {
        if (this.$route.query.id) {
          //编辑商品
          this.rewriteGoods();
        } else {
          //添加商品
          this.addGoods();
        }
      }
    },
    addGoods() {
      this.axios
        .post("/shop/add_goods", {
          token: this.token(),
          name: this.name,
          price: this.price,
          stock: this.num,
          content: this.content,
          img: this.imgid.join()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$router.push("shoplist");
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    rewriteGoods() {
      this.axios
        .post("/shop/edit_goods", {
          token: this.token(),
          name: this.name,
          price: this.price,
          stock: this.num,
          content: this.content,
          img: this.imgid.join(),
          id: this.$route.query.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.$router.push("shoplist");
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 头像单击事件
    portrait1() {
      this.$refs.portrait1.click(); // 获取ref为portrait的元素相当于获取id为portrait的元素
    },
    shangchuan1(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.picValue = files[0];
      this.imgPreview(this.picValue, "0");
      setTimeout(() => {
        this.uploadImg();
      }, 100);
    },
    delectImg(index) {
      // console.log(index);
      // console.log(this.imgid);
      // console.log(this.imgurl);
      this.imgid.splice(index, 1);
      this.imgurl.splice(index, 1);
    },
    // 上传图片请求
    uploadImg(num) {
      this.axios
        .post("/home/base_img", {
          imgurl: this.imgbase[0]
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.imgid.push(data.data.id);
            this.imgurl.push(data.data.url);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss'>
#addGoods {
  background: #f6f6f6;
  padding-top: 82px;
  .addmes {
    background-color: #fff;
    margin-top: 20px;
    .item {
      margin: 0 30px;
      line-height: 90px;
      border-bottom: 2px solid rgba(221, 221, 221, 1);
      span {
        font-size: 28px;
      }
      input {
        padding-left: 10px;
        line-height: 90px;
        width: 500px;
      }
      input::-webkit-input-placeholder {
        /* WebKit browsers */
        color: #999;
        font-size: 28px;
      }
      input:-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #999;
        font-size: 28px;
      }

      input::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #999;
        font-size: 28px;
      }

      input:-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: #999;
        font-size: 28px;
      }
    }
    .item1 {
      margin: 0 30px;
      line-height: 90px;
      font-size: 28px;
    }
    .beizhu {
      position: relative;
      // margin-bottom: 20px;
      text-align: center;
      textarea {
        width: 690px;
        margin: auto;
        padding: 10px;
        border: 1Px solid rgba(238, 238, 238, 1);
        box-sizing: border-box;
      }
      .number {
        color: #ddd;
        position: absolute;
        bottom: 12px;
        right: 36px;
      }
    }
  }
  .item2 {
    padding: 10px 30px;
    // line-height: 94px;
    font-size: 28px;
    color: #d6ae7b;
  }
  .imglist {
    background-color: #fff;
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .uploadyulan {
      border: none;
      display: flex;
      align-items: center;
      img {
        width: 100%;
      }
    }
    .upload {
      width: 220px;
      height: 220px;
      margin-left: 10px;
      margin-top: 10px;
      border-radius: 6px;
      background-color: #ddd;
      overflow: hidden;
      // border: 1Px dashed rgba(153, 153, 153, 1);
      .yulan {
        width: 220px;
        height: 220px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .add {
        width: 80px;
        height: 80px;
        margin: 30px auto;
        text-align: center;
        .iconfont {
          font-size: 60px;
          color: #666;
        }
      }
      input {
        width: 10px;
        opacity: 0;
        filter: alpha(opacity=0);
      }
    }
  }
}
</style>