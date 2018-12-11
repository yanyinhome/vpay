<template>
  <div id="noticeSwiper">
    <div class="news" v-if="news.length > 0">
      <i class="iconfont icon-laba"/>
      <ul class="marquee_list">
        <li v-for="(item,index) in news" :key="index"  :class="{ marquee_top : animate }">{{item.title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animate: false
    };
  },
  mounted() {
    this.showMarquee();
  },
  props: ["news"],
  methods: {
    showMarquee: function() {
      this.animate = true;
      setInterval(() => {
        this.news.push(this.news[0]);
        this.news.shift();
        this.animate = false;
      }, 2000);
    }
  }
};
</script>
<style lang='scss' scoped>
#noticeSwiper {
  background-color: #14171a;
  .news {
    position: relative;
    overflow: hidden;
    padding: 0.1rem 0rem;
    height: 0.84rem;
    box-sizing: border-box;
    background-color: #14171a;
    color: #fff;
    .iconfont {
      line-height: 0.7rem;
    }
    ul {
      padding-left: 0.3rem;
      box-sizing: border-box;
      width: 100%;
      li {
        // padding-left: 0.1rem;
        white-space: nowrap;
        width: 100%;
        text-overflow: ellipsis;
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.24rem;
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(241, 241, 241, 1);
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
    transition: all 2s;
    // margin-top: -0.84rem;
  }
  .marquee_top {
    // transition: all 2s;
    margin-top: -0.84rem;
  }
}
</style>


 
