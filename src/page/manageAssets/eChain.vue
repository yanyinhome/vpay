<template>
  <div id="eChain">
    <com-head :opacity="0">e家公链</com-head>
    <!-- 公告 -->
    <div class="eChain" v-for="item in eChain" :key="item.id" @click="eChainDetail(item.id)">
      <div class="left">
        <p>{{item.name}}</p>
        <p>{{item.content}}</p>
        <p>{{item.create_time}}</p>
      </div>
    </div>
    <div class="mesnull" v-if="!eChain.length" style="margin-top: 30vh; text-align: center;">暂无信息</div>
    <com-foot :select="1"></com-foot>
  </div>
</template>

<script>
export default {
  name: "eChain",
  data() {
    return {
      eChain: []
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading() {
      this.axios
        .post("user/gl", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.eChain = data.data;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", "暂无数据");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    eChainDetail(id) {
      this.$router.push({ name: "eChaindetail", query: { id, id } });
    }
  }
};
</script>
<style lang='scss' scoped>
#eChain {
  background-color: #14171a;
  padding-top: 82px;
  color: #fff;
  .eChain {
    margin: 0 32px;
    border-bottom: 1Px solid #666;
    .left {
      width: 686px;
      p:nth-of-type(1) {
        width: 686px;
        font-size: 32px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #fff;
        line-height: 90px;
        box-sizing: border-box;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      p:nth-of-type(2) {
        font-size: 26px;
        color: rgba(192, 192, 192, 1);
        line-height: 36px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      p:nth-of-type(3) {
        font-size: 24px;
        color: rgba(153, 153, 153, 1);
        line-height: 74px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
    }
  }
}
</style>