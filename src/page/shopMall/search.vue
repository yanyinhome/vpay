<template>
  <div id="search">
    <com-head :opacity="1"></com-head>
    <div class="item">
      <span>
        <i class="iconfont icon-sousuo"></i>
      </span>
      <input type="text" v-model="search" placeholder="请输入你想要搜索的物品或商家" autofocus="autofocus">
    </div>
    <div class="hot">
      <p>热门搜索</p>
      <div class="hotnav">
        <div
          class="box"
          @click="leftNav(index)"
          v-for="(item,index) in hotnav"
          :key="index"
        >{{item.nav}}</div>
      </div>
    </div>
    <div class="history">
      <p>
        <span>热门搜索</span>
        <i @click="delectLog" class="iconfont icon-iconfont-shanchu"></i>
      </p>
      <div class="historynav">
        <p
          class="box"
          @click="leftNav(index)"
          v-for="(item,index) in hotnav"
          :key="index"
        >{{item.nav}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      hotnav: [
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" },
        { nav: "热门" }
      ]
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
      delectLog(){
          this.$bus.$emit("comAlert", {
        info: "你确定删除全部历史记录？",
        button: [
          {
            text: "确认",
            callback: () => {
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
      }
  }
};
</script>
<style lang='scss' scoped>
#search {
  background-color: #fff;
  padding-top: 82px;
  .item {
    position: fixed;
    top: 11px;
    left: 84px;
    padding: 0 30px;
    box-sizing: border-box;
    background: rgba(42, 42, 42, 1);
    line-height: 60px;
    border-radius: 30px;
    z-index: 100;
    span {
      font-size: 34px;
      color: #999;
    }
    input {
      padding-left: 10px;
      line-height: 60px;
      width: 500px;
      background: none;
      font-size: 26px;
      color: #fff;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #888;
      font-size: 28px;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #888;
      font-size: 28px;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #888;
      font-size: 28px;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #888;
      font-size: 28px;
    }
  }
  .hot {
    padding: 0 20px;

    p {
      margin-top: 20px;
      font-size: 32px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 80px;
    }
    .hotnav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .box {
        margin: 15px 10px;
        padding: 10px 50px;
        background: rgba(42, 42, 42, 1);
        font-weight: 400;
        border-radius: 40px;
        font-size: 26px;
        color: #fff;
      }
    }
  }
  .history {
    p {
      margin-top: 20px;
      padding: 0 30px;
      font-size: 32px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(0, 0, 0, 1);
      line-height: 80px;
      border-bottom: 1px solid #cbcbcb;
      display: flex;
      justify-content: space-between;
      .icon-iconfont-shanchu {
        font-size: 40px;
        font-weight: 700;
        color: #888888;
      }
    }
    .historynav {
      margin: 0 30px;
      .box {
        margin-top: 0px;
        padding: 0;
        font-weight: 400;
        font-size: 26px;
        color: #000;
      }
    }
  }
}
</style>