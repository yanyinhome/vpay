<template>
  <div id="sweepCode">
    <com-head :opacity="0">扫一扫</com-head>
    <div class="scan">
      <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
      </div>
      <p class="code">将二维码放入框内</p>
      <footer>
        <mt-button type="primary" @click="startRecognize">1.创建控件</mt-button>
        <mt-button type="primary" @click="startScan">2.开始扫描</mt-button>
        <mt-button type="primary" @click="cancelScan">3.结束扫描</mt-button>
        <mt-button type="primary" @click="closeScan">4.关闭控件</mt-button>
      </footer>
    </div>
  </div>
</template>

<script>
let scan = null;
export default {
  name: "sweepCode",
  data() {
    return {
      codeUrl: ""
    };
  },

  computed: {},

  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     vm.startRecognize();
  //   });
  // },
  activated(){
    this.startRecognize();
  },
  created() {},

  mounted() {
    this.startScan();
  },

  methods: {
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked;
      function onmarked(type, result, file) {
        switch (type) {
          case plus.barcode.QR:
            type = "QR";
            break;
          case plus.barcode.EAN13:
            type = "EAN13";
            break;
          case plus.barcode.EAN8:
            type = "EAN8";
            break;
          default:
            type = "其它" + type;
            break;
        }
        var result = result.replace(/\n/g, "");
        that.codeUrl = result;
        // alert(result);
        window.location.href = result;
        that.closeScan();
      }
    },
    //开始扫描
    startScan() {
      if (!window.plus) return;
      scan.start();
    },
    //关闭扫描
    cancelScan() {
      if (!window.plus) return;
      scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      if (!window.plus) return;
      scan.close();
    }
  },
  beforeDestroy() {
    this.cancelScan();
    this.closeScan();
  },
  beforeRouteLeave(to, from, next) {
    //B是B弹框的v-model值
    // if (this.B) {
    //   this.B= false;
    //   next(false);
    // } else {
    //   next();
    // }
    // this.cancelScan();
    // this.closeScan();
  }
  // 销毁解绑
  // beforeDestroy () {
  //   this.$bus.$emit('comAlert');
  // },
};
</script>
<style lang='scss' scoped>
#sweepCode {
  padding-top: 82px;
  color: #fff;
  .scan {
    height: 100%;
    #bcid {
      width: 100%;
      // position: absolute;
      // left: 0;
      // right: 0;
      // top: 0;
      // bottom: 3rem;
      height: 60vh;
      text-align: center;
      background: #000;
    }
    footer {
      position: absolute;
      left: 0;
      bottom: 1rem;
      height: 2rem;
      line-height: 2rem;
      z-index: 2;
    }
  }
  .code {
    text-align: center;
    color: #d6ae7b;
    line-height: 120px;
  }
  footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .mint-button--primary {
      height: 60px;
    }
  }
}
</style>