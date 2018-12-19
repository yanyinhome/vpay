<template>
  <div id="pageHead" :class="{'page_head_opacity': opacity=='1','bg_opacity':opacity=='2'}">
    <p class="iconfont icon-shangyiye" @click="clickBack"></p>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'pageHead',
  data () {
    return {};
  },
  methods: {
    clickBack () {
      this.$router.go(-1);
    }
  },
  props: [
    'opacity'
  ]
};
</script>

<style lang="scss">
  #pageHead {
    position: fixed;
    top: 0;
    left: 0;
    left: 50%;
    width: 750px;
    margin-left: -375px;
    height: 82px;
    line-height: 82px;
    font-size: 34px;
    font-weight: 500;
    text-align: center;
    color: #fff;
    background: #212121;
    border-bottom: 1Px solid rgba(0,0,0,0.1);
    z-index: 99;
    .icon-shangyiye {
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      font-size: 40px;
    }
    &.page_head_opacity {
      background: #fff;
      color: #000;
    }
    &.bg_opacity {
      background: none;
      color: #fff;
    }
  }
</style>
