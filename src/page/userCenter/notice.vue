<template>
  <div id="notice">
    <com-head :opacity="0">公告</com-head>
    <!-- 公告 -->
    <div class="notice" v-for="item in notice" :key="item.id" @click="noticeDetail(item.id)">
      <div class="left">
        <p>{{item.title}}</p>
        <p>{{item.content}}</p>
        <p>{{item.create_time}}</p>
      </div>
    </div>
    <div class="mesnull" v-if="!notice.length" style="margin-top: 30vh; text-align: center;">暂无信息</div>
  </div>
</template>

<script>
export default {
  name: "notice",
  data() {
    return {
      notice: []
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
        .post("user/newslist", {
          token: this.token()
        })
        .then(({ data }) => {
          
          if (data.code === "200") {
            this.notice = data.data;
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
    shownav() {
      this.$bus.$emit("navlist");
    },
    noticeDetail(id) {
      this.$router.push({ name: "noticeDetail", query: { id, id } });
    }
  }
};
</script>
<style lang='scss' scoped>
#notice {
  background-color: #14171a;
  padding-top: 82px;
  color: #fff;
  .notice {
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