<template>
  <div id="comAlert" v-show="show">
    <div class="alert_inner">
      <p class="alert_title">{{ title }}</p>
      <p class="alert_info" v-if="info">{{ info }}</p>
      <div class="alert_inbox" v-html="infoHtml" v-if="infoHtml"></div>
      <div class="alert_btn">
        <button
          class="alert_buttons"
          v-for="(item, index) in button"
          :key="index"
          @click="buttonClick(item.callback)"
          v-if="button.length !== 1"
        >{{ item.text }}</button>
        <button
          class="alert_button"
          @click="buttonClick(button[0].callback)"
          v-else
        >{{ button[0].text }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comAlert",
  data() {
    return {
      show: false,
      title: "",
      info: "",
      infoHtml: "",
      button: []
    };
  },
  mounted() {
    this.$bus.$on("comAlert", config => {
      if (!config) return (this.show = false);
      this.show = true;
      this.title = config.title;
      this.info = config.info;
      this.infoHtml = config.infoHtml;
      this.button = config.button;
    });
  },
  methods: {
    buttonClick(cb) {
      this.$bus.$emit("comAlert", false);
      cb();
    }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/common_style";
#comAlert {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background: rgba(0, 0, 0, 0.6);
  .alert_inner {
    width: 590px;
    box-sizing: border-box;
    padding: 30px 0px 0;
    background: #ffffff;
    border-radius: 30px;
    position: absolute;
    top: 27%;
    left: 80px;
    text-align: center;
    overflow: hidden;
    .alert_title {
      color: #000;
      line-height: 110px;
      font-size: 36px;
      font-weight: 700;
    }
    .alert_info {
      line-height: 60px;
      font-size: 36px;
      color: #000;
    }
    .alert_inbox {
      font-size: 36px;
      color: #000;
    }
    .alert_btn {
      margin-top: 40px;
      display: flex;
      justify-content: space-between;
      border-top: 1Px solid #eee;
      .alert_buttons {
        width: 295px;
        height: 118px;
        line-height: 118px;
        color: #fff;
        font-size: 36px;
        background: #ffffff;
        &:nth-child(1) {
          color: rgba(214, 174, 123, 1);
        }
        &:nth-child(2) {
          color: #888;
          border-left: 1Px solid #eee;
        }
      }
      .alert_button {
        width: 400px;
        margin: 0 auto;
        height: 110px;
        line-height: 110px;
        color: #888;
        font-size: 36px;
        border-radius: 39px;
        color: rgba(214, 175, 124, 1);
        background: none;
      }
    }
  }
}
</style>
