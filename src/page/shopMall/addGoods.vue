<template>
  <div id="addGoods">
    <com-head :opacity="1">新增商品</com-head>
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
          maxlength="30"
          placeholder="请输入商品描述"
          v-model="content"
          cols="80"
          rows="5"
        ></textarea>
        <span class="number">{{number}}/30</span>
      </div>
    </div>
    <div class="item2">
      <span>为了更好的展示商品，请上传长宽比例为1:1的图片。</span>
    </div>
    <div class="imglist">
      <el-upload
        action="https://jsonplaceholder.typicode.com"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :multiple="true"
        :limit="6"
        :on-exceed="numWarn"
        :on-success="uploadImg"
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </div>
    <com-button :click="submitTo">上传商品</com-button>
  </div>
</template>

<script>
export default {
  name: "addGoods",
  data() {
    return {
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
      console.log(this.number);
      if (this.number > 29) {
        this.$bus.$emit("toast", "字数不能超过50");
      }
    }
  },
  computed: {},

  created() {},

  mounted() {},

  methods: {
    submitTo(){
      this.axios
        .post("/shop/my_shop", {
          token: this.token(),
          name: this.name,
          price: this.price,
          stock: this.num,
          content: this.content,
          img: this.img,
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    uploadImg(response, file, fileList) {
      console.log(fileList);
    },
    numWarn(files, fileList) {
      this.$bus.$emit("toast", "最多只能上传6张图片");
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
    margin: 0 30px;
    line-height: 94px;
    font-size: 28px;
    color: #d6ae7b;
  }
  .imglist {
    background-color: #fff;
    padding: 30px;
    .el-icon-plus {
      font-size: 50px;
      line-height: 220px;
    }
    .el-upload-list--picture-card .el-upload-list__item {
      width: 220px;
      height: 220px;
    }
    .el-upload--picture-card {
      width: 220px;
      height: 220px;
      background-color: rgba(221, 221, 221, 1);
      border-radius: 6px;
    }
  }
}
</style>