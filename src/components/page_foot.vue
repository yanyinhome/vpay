<template>
  <div id="pageFoot">
    <div class="page_foot_inner">
      <div
        class="page_foot_nav"
        :class="{'page_foot_select': select === index}"
        v-for="(item, index) in routeList"
        :key="index"
        @click="footRoute(item.route)"
      >
        <div class="navlist">
          <img :src="[select === index ? item.iconfont1 : item.iconfont,]">
        </div>
        <p :class="[select === index ? 'selectText' : '', 'page_foot_name']">{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pageFoot",
  data() {
    return {
      routeList: [
        // 底部信息
        {
          iconfont: require("../assets/image/nav11.png"),
          iconfont1: require("../assets/image/nav12.png"),
          name: "首页",
          route: '/index'
        },
        {
          iconfont: require("../assets/image/nav21.png"),
          iconfont1: require("../assets/image/nav22.png"),
          name: "e家公链",
          // route: '/assets'
        },
        {
          iconfont: require("../assets/image/nav31.png"),
          iconfont1: require("../assets/image/nav32.png"),
          name: "藏宝阁",
          route: '/goodsHome'
        }
      ]
    };
  },
  methods: {
    footRoute(route) {
      this.$router.push({ path: route });
    },
    fabu() {
      this.$router.push("fabu");
    }
  },
  props: ["select"]
};
</script>

<style lang="scss">
@import "../assets/scss/common_style.scss";
#pageFoot {
  position: fixed;
  top: 100vh;
  left: 50%;
  width: 750px;
  margin-left: -375px;
  .page_foot_inner {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 98px;
    background: #212121;
    .page_foot_nav {
      width: 250px;
      float: left;
      text-align: center;
      color: #999;
      // background-color: red;
      .navlist {
        margin: 0 auto;
        // margin-top: 13px;
        width: 56px;
        height: 52px;
        img {
          width: 100%;
          height: 100%;
          font-size: 46px;
          line-height: 52px;
          padding-top: 10px;
          width: 56px;
          height: 52px;
        }
      }
      .page_foot_name {
        font-size: 20px;
        line-height: 54px;
      }
      &.page_foot_select {
        .page_foot_iconfont {
          color: #d6ae7b;
        }
        .page_foot_name {
          color: #d6ae7b;
        }
      }
    }
    .fabu {
      width: 120px;
      height: 120px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
      img {
        width: 100%;
      }
    }
  }
}
</style>
