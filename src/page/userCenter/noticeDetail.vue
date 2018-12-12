<template>
  <div id='noticeDetail'>
    <com-head :opacity='0'></com-head>
    <div class="notice">
        <div class="left">
            <p>{{news_title}}</p>
            <p>{{create_time}}</p>
        </div>
    </div>
    <div v-html="detail"></div>
  </div>
</template>

<script>
export default {
  name: "noticeDetail",
  data() {
    return {
      id: this.$route.query.id,
      detail: "",
      news_title: '',
      create_time: ''
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
        .post("user/newsinfo", {
          token: this.token(),
          id: this.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.detail = data.data.news_content;
            this.news_title = data.data.title;
            this.create_time = data.data.create_time;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
#noticeDetail {
  padding: 80px 32px;
  .notice {
    // margin: 0 32px;
    // border-bottom: 1Px solid #eee;
    // padding: 0 30px;
    .left {
      width: 686px;
      text-align: center;
      p:nth-of-type(1) {
        width: 686px;
        font-size: 32px;
        font-family: PingFangSC-Medium;
        font-weight:500;
        color:rgba(255,255,255,1);
        line-height: 96px;
        box-sizing: border-box;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        color:rgba(153,153,153,1);
        line-height: 70px;
      }
    }
  }
}
</style>