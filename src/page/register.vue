<template>
  <div id="noticeSwiper">
    <div class="news" v-if="news.length > 0">
      <i class="iconfont icon-3denglumima"/>
      <ul class="marquee_list" :class="{ marquee_top : animate }">
        <li v-for="(item,index) in news" :key="index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      news: [
        '',2,3
      ],
      animate: false
    };
  },
  mounted() {
    // this.showMarquee();
  },
  methods: {
    showMarquee() {
      this.animate = true;
      setInterval(() => {
        this.news.push(this.news[0]);
        this.news.shift();
        this.animate = false;
      }, 1000);
    }
  }
};
</script>
<style lang='scss' scoped>
#noticeSwiper {
  background-color: #fff;
  .news {
    position: relative;
    overflow: hidden;
    padding: 0.1rem 0.3rem;
    height: 0.84rem;
    box-sizing: border-box;
    background-color: #000;
    color: #fff;
    .iconfont {
      line-height: 0.70rem;
    }
    ul {
      padding-left: 0.6rem;
      box-sizing: border-box;
      width: 100%;
      li {
        padding-left: 0.1rem;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.3rem;
        display: block;
        overflow: hidden;
        padding: 0.1rem;
      }
    }
  }
  .marquee_list {
    position: absolute;
    top: 0px;
    left: 0px;
  }

  .marquee_top {
    transition: all 0.5s;
    margin-top: -0.84rem;
  }
}
</style>


 
