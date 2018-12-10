<template>
  <div id="index">
    <navlist></navlist>
    <button @click="shownav">左侧导航</button>
    <p>hello world</p>
  </div>
</template>

<script>
import navlist from "../components/navlist";
export default {
  name: "index",
  data() {
    return {};
  },

  computed: {},

  created() {
    this.shownav();
  },

  mounted() {},

  methods: {
    shownav() {
      this.$bus.$emit("navlist");
    }
  }
};
</script>
<style lang='scss' scoped>
#index {
}
</style>