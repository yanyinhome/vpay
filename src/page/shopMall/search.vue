<template>
  <div id="search">
    <com-head :opacity="1"></com-head>
    <div class="item">
      <span>
        <i class="iconfont icon-sousuo"></i>
      </span>
      <input type="text" v-model="search" placeholder="请输入你想要搜索的物品或商家" v-focus>
      <i class="iconfont icon-shanchu" @click="delectValue"></i>
    </div>
    <div class="keepdata" @click="sureSearch">确定</div>
    <div class="hot">
      <p>热门搜索</p>
      <div class="hotnav">
        <div
          class="box"
          @click="hotSearch(item.name)"
          v-for="(item,index) in hotnav"
          :key="index"
        >{{item.name}}</div>
      </div>
    </div>
    <div class="history">
      <p>
        <span>搜索历史</span>
        <i @click="delectLog" class="iconfont icon-iconfont-shanchu"></i>
      </p>
      <div class="historynav">
        <p
          class="box"
          @click="hotSearch(item.name)"
          v-for="(item,index) in log"
          :key="index"
        >{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      search: "",
      hotnav: [],
      log: []
    };
  },
  directives: {
    focus: {
      // 获取焦点
      inserted: function(el) {
        el.focus();
      }
    }
  },
  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading() {
      this.axios
        .post("/shop/serch_view", {
          token: this.token()
        })
        .then(({ data }) => {
          
          if (data.code == "200") {
            this.hotnav = data.data.hot_serch;
            this.log = data.data.serch_history;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    hotSearch(name) {
      this.$router.push({ name: "searchShop", query: { keyword: name } });
    },
    delectLog() {
      this.$bus.$emit("comAlert", {
        info: "你确定删除全部历史记录？",
        button: [
          {
            text: "确认",
            callback: () => {
              this.axios
                .post("/shop/del_serch", {
                  token: this.token()
                })
                .then(({ data }) => {
                  
                  if (data.code == "200") {
                    this.log = [];
                    this.$bus.$emit("toast", data.msg);
                  } else if (data.code == "204") {
                    this.$bus.$emit("toast", data.msg);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
    },
    delectValue() {
      this.search = "";
    },
    sureSearch() {
      if (!this.search) {
        this.$bus.$emit("toast", "搜索词不能为空");
      } else {
        this.$router.push({
          name: "searchShop",
          query: { keyword: this.search }
        });
      }
    }
  }
};
</script>
<style lang='scss' scoped>
#search {
  background-color: #fff;
  padding-top: 82px;
  .keepdata {
    width: 140px;
    height: 80px;
    text-align: center;
    color: #000;
    line-height: 80px;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 100;
  }
  .item {
    position: fixed;
    top: 12px;
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
    .icon-shanchu {
      color: #999;
    }
    input {
      padding-left: 10px;
      line-height: 60px;
      width: 400px;
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
    padding: 0 30px;
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
      border-bottom: 1Px solid #cbcbcb;
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