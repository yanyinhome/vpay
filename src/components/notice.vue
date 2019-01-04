<template>
  <div id="noticeSwiper">
    <div class="news" v-if="news.length > 0">
      <i class="iconfont icon-laba"/>
      <div class="marquee_box">
        <ul class="marquee_list" :class="{marquee_top:animate}">
          <li v-for="(item, index) in news" :key="index" @click="noticeDetail(item.id)">
            <span>{{item.title}}</span>
          </li>
        </ul>
      </div>
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
    if (this.news.length > 0) {
    }
    setInterval(this.showMarquee, 3000);
  },
  props: ["news"],
  methods: {
    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.news.push(this.news[0]);
        this.news.shift();
        this.animate = false;
      }, 500);
    },
    noticeDetail(id) {
      this.$router.push({ name: "noticeDetail", query: { id, id } });
    }
  }
};
</script>
<style lang='scss' scoped>
#noticeSwiper {
  background-color: #14171a;
  color: #fff;
  div,
  ul,
  li,
  span,
  img {
    margin: 0;
    padding: 0;
    display: flex;
    box-sizing: border-box;
  }
  .marquee {
    width: 100%;
    height: 50px;
    align-items: center;
    color: #fff;
    background-color: #b3effe;
    display: flex;
    box-sizing: border-box;
  }
  .marquee_title {
    padding: 0 10px;
    height: 30px;
    font-size: 30px;
    border-right: 1Px solid #d8d8d8;
    align-items: center;
  }
  .icon-laba {
    font-size: 36px;
  }
  .marquee_box {
    display: block;
    position: relative;
    width: 100%;
    margin-top: 10px;
    height: 30px;
    overflow: hidden;
  }
  .marquee_list {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    span {
      font-size: 30px;
    }
  }
  .marquee_top {
    transition: all 0.5s;
    margin-top: -30px;
  }
  .marquee_list li {
    height: 30px;
    line-height: 30px;
    font-size: 30px;
    padding-left: 10px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
  }
  .marquee_list li span {
    padding: 0 2px;
  }
  .red {
    color: #ff0101;
  }
}
</style>


 
