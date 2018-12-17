<template>
  <div id="translateLog">
    <com-head :opacity="0">{{name}}</com-head>
    <!-- 转入记录 -->
    <div class="chargeLog" v-for="item in log" :key="item.id">
      <div class="left">
        <div class="img">
          <img :src="item.img">
        </div>
        <div class="mes">
          <p>{{item.content}}</p>
          <p>{{item.create_time}}</p>
        </div>
      </div>
      <div class="right" :class="{active: item.money>0}">
        <p>{{item.num}}</p>
      </div>
    </div>
    <div class="mesnull" v-if="!log.length" style="margin-top: 30vh; text-align: center;">暂无信息</div>
  </div>
</template>

<script>
export default {
  name: "translateLog",
  data() {
    return {
      name: "",
      log: []
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {}
};
</script>
<style lang='scss' scoped>
#translateLog {
  padding-top: 82px;
  color: #fff;
  .chargeLog {
    margin-top: 20px;
    padding: 0 32px;
    height: 144px;
    background: rgba(42, 42, 42, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 400px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        width: 80px;
        height: 80px;
        border-radius: 40px;
        overflow: hidden;
      }
      .mes {
        margin-left: 20px;
      }
      p:nth-of-type(1) {
        // padding-top: 20px;
        font-size: 28px;
        color: #c1c1c1;
        line-height: 60px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        color: #c1c1c1;
        line-height: 40px;
      }
    }
    .right {
      p:nth-of-type(1) {
        font-size: 30px;
        color: #d6ae7b;
        line-height: 60px;
      }
      p:nth-of-type(2) {
        font-size: 22px;
        color: #999;
        line-height: 40px;
      }
    }
  }
}
</style>