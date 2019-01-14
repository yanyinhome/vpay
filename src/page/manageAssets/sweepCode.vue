<template>
  <div id="sweepCode">
    <com-head :opacity="0">扫一扫</com-head>
    <div class="scan" v-if="show">
      <div id="bcid">
        <div class="box"></div>
        <p class="tip">...载入中...</p>
      </div>
      <p class="code">将二维码放入框内</p>
      <footer>
        <!-- <mt-button type="primary" @click="startRecognize">1.创建控件</mt-button>
        <mt-button type="primary" @click="startScan">2.开始扫描</mt-button>
        <mt-button type="primary" @click="cancelScan">3.结束扫描</mt-button>
        <mt-button type="primary" @click="closeScan">4.关闭控件</mt-button>-->
      </footer>
    </div>
  </div>
</template>

<script>
let scan = null;
//点手机虚拟返回键
// document.addEventListener("plusready", function() {
//   // 注册返回按键事件
//   plus.key.addEventListener(
//     "backbutton",
//     function() {
//       // 事件处理
//       scan.close(); //关闭条码识别控件
//       window.history.back();
//     },
//     false
//   );
// });
export default {
  name: "sweepCode",
  data() {
    return {
      show: true,
      codeUrl: ""
    };
  },

  computed: {},

  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name != 'index') {
        vm.$router.push('index');
      }
    });
  },

  mounted() {
    this.startRecognize();
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
    // this.cancelScan();
    this.closeScan();
  }
 
};
</script>
<style lang='scss' scoped>
#sweepCode {
  padding-top: 82px;
  color: #fff;
  .scan {
    height: 100%;
    width: 100vw;
    #bcid {
      width: 100vw;
      position: absolute;
      left: 0;
      right: 0;
      top: 82px;
      height: 60vh;
      text-align: center;
      background: #000;
      .box {
        height:40%;
        width:100%;
      }
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
    margin-top: 60vh;
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