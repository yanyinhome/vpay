<template>
  <button class="com_button" :class="{'com_button_click': isClick}" @click="buttonClick">
    <slot>确认</slot>
  </button>
</template>

<script>
export default {
  name: "comButton",
  data() {
    return {
      isClick: false
    };
  },
  methods: {
    buttonClick() {
      this.isClick = true;
      setTimeout(() => {
        this.isClick = false;
      }, 100);
      this.click();
    }
  },
  props: ["click"]
};
</script>

<style lang="scss">
@import "../assets/scss/common_style";
.com_button {
  // @include buttonBgChangeStyle();
  transition: all 0.1s;
  // color: #ffffff;
  font-size: 30px;
  color: #000000;
  width: 690px;
  height: 80px;
  background: linear-gradient(
    90deg,
    rgba(234, 205, 163, 1) 0%,
    rgba(214, 174, 123, 1) 100%
  );
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 100px;
  display: block;
  &.com_button_click {
    // background: #f28c0e;
    color: #000;
    // margin-top: 3px;
    // margin-bottom: -3px;
  }
}
</style>
