<template>
  <div id="goodsCLassification">
    <com-head :opacity="1"></com-head>
    <div class="item">
      <span>
        <i class="iconfont icon-sousuo"></i>
      </span>
      <router-link tag="div" to="search" class="search"><input type="text" v-model="search" placeholder="请输入你想要搜索的物品或商家"></router-link>  
    </div>
    <!-- 左侧导航 -->
    <div class="leftnav">
      <div class="box" @click="leftNav(index)" :class="{active: active==index}" v-for="(item,index) in leftnav" :key="index">{{item.nav}}</div>
    </div>
    <!-- 右侧内容 -->
    <div class="rightgoods">
      <div class="goodtype">
        <div class="title">热门</div>
        <div class="good">
          <div class="box">
            <div class="img">
              <img src="../../assets/image/jiantou.png">
            </div>
            <p>葡萄酒</p>
          </div>
          <div class="box">
            <div class="img">
              <img src="../../assets/image/card3.png">
            </div>
            <p>葡萄酒</p>
          </div>
          <div class="box">
            <div class="img">
              <img src="../../assets/image/jiantou.png">
            </div>
            <p>葡萄酒</p>
          </div>
          <div class="box">
            <div class="img">
              <img src="../../assets/image/jiantou.png">
            </div>
            <p>葡萄酒</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodsCLassification",
  data() {
    return {
        active: '0',
        leftnav:[{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},{ nav: '热门'},],
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
      leftNav(index){
          this.active = index;
      }
  }
};
</script>
<style lang='scss' scoped>
#goodsCLassification {
  background-color: #fff;
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
    .search {
        display: inline-block;
      width: 490px;
      input {
      padding-left: 10px;
      line-height: 60px;
      background: none;
      width: 490px;
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
    
  }
  .leftnav {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 180px;
    height: calc(100% - 84px);
    // height:600px;
    background: rgba(42, 42, 42, 1);
    z-index: 10000;
    color: #fff;
    overflow-y: scroll;
    .box {
    //   width: 180px;
      line-height: 100px;
      text-align: center;
      overflow-x: scroll;
      box-sizing: border-box;
    }
    .active {
      color: #d6ae7b;
      border-left: 4px solid #d6ae7b;
      box-sizing: border-box;
    }
  }
  .rightgoods {
    height: 900px;
    padding-left: 180px;
    padding-top: 82px;
    // background-color: red;
    .goodtype {
    margin: 0 20px;
      border-bottom: 1px solid rgba(196, 196, 196, 1);
      .title {
        line-height: 100px;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(0, 0, 0, 1);
      }
      .good {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        .box {
          width: 140px;
          height: 234px;
        //   background-color: #fd0;
          .img {
            width: 140px;
            height: 170px;
            display: flex;
            justify-content: center;
            flex-direction: column;
            img {
              width: 100%;
            }
          }
          p {
            text-align: center;
            font-size: 26px;
            font-family: PingFangSC-Regular;
            font-weight: 400;
            color: rgba(102, 102, 102, 1);
            line-height: 60px;
          }
        }
      }
    }
  }
}
</style>