<template>
  <div id="sweepCode">
    <com-head :opacity="0">扫一扫</com-head>    
    <div class="scan">
      <div id="bcid">
        <div style="height:40%"></div>
        <p class="tip">...载入中...</p>
      </div>
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
      codeUrl: "http://app.3wej.com/turnOutmes?UID=BZ5Zib"
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    //创建扫描控件
    startRecognize() {
      let that = this;
      if (!window.plus) return;
      scan = new plus.barcode.Barcode("bcid");
      scan.onmarked = onmarked;
      console.log(scan);
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
        alert(result);
        that.closeScan();
      }
    },
    //开始扫描
    startScan() {
      console.log(1);
      if (!window.plus) return;
      scan.start();
    },
    //关闭扫描
    cancelScan() {
      console.log(2);
      if (!window.plus) return;
      scan.cancel();
    },
    //关闭条码识别控件
    closeScan() {
      console.log(3);
      if (!window.plus) return;
      scan.close();
    }

    // startRecognize() {
    //   document.getElementById("bcid").style.display = "block";
    //   document.getElementsByClassName("scanCode")[0].style.display = "none";

    //   let that = this;
    //   if (!window.plus) return;
    //   scan = new plus.barcode.Barcode("bcid");
    //   scan.onmarked = onmarked;
    //     console.log("11");

    //   setTimeout(function() {
    //     that.startScan1();
    //   }, 100);

    //   function onmarked(type, result, file) {
    //     console.log("type");

    //     switch (type) {
    //       case plus.barcode.QR:
    //         type = "QR";
    //         break;
    //       case plus.barcode.EAN13:
    //         type = "EAN13";
    //         break;
    //       case plus.barcode.EAN8:
    //         type = "EAN8";
    //         break;
    //       default:
    //         type = "其它" + type;
    //         break;
    //     }
    //     result = result.replace(/\n/g, "");
    //     that.codeUrl = result;
    //     alert(that.codeUrl);
    //     if (that.codeUrl) {
    //       that.cancelScan1();
    //       that.closeScan1();
    //     }
    //   }
    // },
    // //开始扫描
    // startScan1() {
    //     console.log("开始扫描");
    //   if (!window.plus) return;
    //   scan.start();
    // },
    // //关闭扫描
    // cancelScan1() {
    //     console.log("关闭扫描");

    //   if (!window.plus) return;
    //   scan.cancel();
    // },
    // //关闭条码识别控件
    // closeScan1() {
    //     console.log("关闭条码识别控件");

    //   document.getElementById("bcid").style.display = "none";
    //   document.getElementsByClassName("scanCode")[0].style.display = "block";
    //   if (!window.plus) return;
    //   scan.close();
    // }
  }
};
</script>
<style lang='scss' scoped>
#sweepCode {
  padding-top: 100px;
  color: #fff;
  .scan {
    height: 100%;
    #bcid {
      width: 100%;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 3rem;
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