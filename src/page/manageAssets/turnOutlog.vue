<template>
  <div id="turnOutlog">
    <com-head :opacity="0">{{name}}</com-head>
    <!-- 转入记录 -->
    <div v-if="status!='5'" class="chargeLog" v-for="item in log" :key="item.id">
      <div class="left">
        <p>{{item.content}}</p>
        <p>{{item.create_time}}</p>
      </div>
      <div class="right" :class="{active: item.money>0}">
        <p>{{item.num}}</p>
        <p v-if="status!='3'">{{item.after_ban}}</p>
        <p v-if="status=='3'">{{item.after_int}}</p>
      </div>
    </div>
    <!-- 分享记录 -->
    <div v-if="status=='5'" class="chargeLog" v-for="item in log" :key="item.id">
      <div class="left">
        <p>成功邀请了用户&nbsp;{{item.user_id}}</p>
        <p>{{item.create_time}}</p>
      </div>
    </div>
    <div class="mesnull" v-if="!log.length" style="margin-top: 30vh; text-align: center;">暂无信息</div>

  </div>
</template>

<script>
export default {
  name: "turnOutlog",
  data() {
    return {
      status: this.$route.query.status,
      name: '',
      log: [],
    };
  },

  computed: {},

  created() {
    if (this.status == "1") {
      //转出记录
      this.name = "转出记录";
      this.loading('1');
    } else if (this.status == "2") {
      //转入记录
      this.name = "转入记录";
      this.loading('2');
    } else if (this.status == "3") {
      //积分记录
      this.name = "积分记录";
      this.loadGrade('2');
    } else if (this.status == "4") {
      //余额记录
      this.name = "余额记录";
      this.loadGrade('1');
    } else if (this.status == "5") {
      //分享记录
      this.name = "分享记录";
      this.loadShare();
    }
  },

  mounted() {},

  methods: {
    loading(type) {
      this.axios
        .post("exchange/turnoutlog", {
          token: this.token(),
          type: type
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.log = data.data;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadGrade(type) {
      this.axios
        .post("exchange/integrallog", {
          token: this.token(),
          type: type
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.log = data.data;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loadShare() {
      this.axios
        .post("user/sharelog", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.log = data.data;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  }
};
</script>
<style lang='scss' scoped>
#turnOutlog {
  padding-top: 82px;
  color: #fff;
  .chargeLog {
    margin: 0 32px;
    height: 144px;
    border-bottom: 1Px solid rgba(68,68,68,1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      width: 450px;
      p:nth-of-type(1) {
        // padding-top: 20px;
        font-size: 28px;
        color: #C1C1C1;
        line-height: 60px;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        color: #C1C1C1;
        line-height: 40px;
      }
    }
    .right {
      p:nth-of-type(1) {
        font-size: 28px;
        color: #fff;
        line-height: 60px;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        color: #888;
        line-height: 40px;
      }
    }
    .active {
      color: #ec0202;
    }
  }
}
</style>