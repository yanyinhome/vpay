<template>
  <div id="buyList">
    <com-head :opacity="0">{{name}}</com-head>
    <div class="buyList" v-for="(item,index) in message" :key="index">
      <div class="box1">
        <img v-if="status=='1'" :src="img">
        <img v-else :src="item.head_img">
      </div>
      <div class="box2">
        <p v-if="status=='1'">{{UID}}</p>
        <p v-else>{{item.UID}}</p>
        <p>{{item.create_time}}</p>
      </div>
      <div class="box3">
        <p>金额：{{item.num}}</p>
        <!-- <p>实付金额：{{item.create_time}}</p> -->
        <div>
          <button v-if="status==1" @click="cloce(index,item.id)">取消</button>
          <button v-if="status==3" class="bgnone">已完成</button>
          <button
            :class="{bgnone: item.flag=='请等待对方确认'}"
            :disabled="item.flag=='请等待对方确认'"
            v-if="status==2"
            @click="upload(item.id)"
          >{{item.flag}}</button>
        </div>
      </div>
    </div>
    <div v-if="!message.length&&isRequest" style="margin-top: 30vh; text-align: center;">暂无信息</div>
  </div>
</template>

<script>
export default {
  name: "buyList",
  data() {
    return {
      isRequest: false,
      name: "",
      status: this.$route.query.status,
      show: false,

      img: "",
      time: "",
      UID: "",
      message: [],
      rate: "0.1",
      money: "",
      password: ""
    };
  },

  computed: {},

  created() {
    if (this.status == "1") {
      //未匹配
      this.name = "未匹配订单";
      this.loading1();
    } else if (this.status == "2") {
      //已匹配
      this.loading2();
      this.name = "已匹配订单";
    } else if (this.status == "3") {
      //已完成
      this.name = "已完成";
      this.loading3();
    }
  },

  mounted() {},

  methods: {
    loading1() {
      this.axios
        .post("transaction/unmatched", {
          token: this.token(),
          type: "2"
        })
        .then(({ data }) => {
          console.log(data);
          this.isRequest = true;
          if (data.code === "200") {
            this.img = data.data.head_img;
            this.UID = data.data.UID;
            this.message = data.data.log;
            // for (let index = 0; index < data.data.credit; index++) {
            //   this.grade.push(1);
            // }
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loading2() {
      this.axios
        .post("transaction/almatched", {
          token: this.token(),
          type: "2"
        })
        .then(({ data }) => {
          console.log(data);
          this.isRequest = true;
          if (data.code === "200") {
            this.message = data.data.log;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    loading3() {
      this.axios
        .post("transaction/completed_order", {
          token: this.token(),
          type: "2"
        })
        .then(({ data }) => {
          console.log(data);
          this.isRequest = true;
          if (data.code === "200") {
            this.message = data.data.log;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "205") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    upload(id) {
      this.$router.push({ name: "uploadImg", query: { id: id } });
    },
    cloce(index, id) {
      this.axios
        .post("transaction/cancel", {
          token: this.token(),
          type: "2",
          id: id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.message.splice(index, 1);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
#buyList {
  padding-top: 82px;
  color: #fff;
  .buyList {
    margin-top: 20px;
    width: 750px;
    height: 202px;
    background: rgba(42, 42, 42, 1);
    display: flex;
    justify-content: flex-start;
    // align-items: center;
    padding: 30px;
    box-sizing: border-box;
    .box1 {
      width: 120px;
      height: 120px;
      border-radius: 60px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .box2 {
      //   width: 220px;
      margin-left: 30px;
      font-size: 28px;

      p:nth-of-type(1) {
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
      }
      // p:nth-of-type(2) {
      //   font-size: 24px;
      //   font-family: PingFangSC-Regular;
      //   font-weight: 400;
      //   color: rgba(177, 177, 177, 1);
      //   line-height: 40px;
      //   display: flex;
      //   align-items: center;
      //   img {
      //     display: inline-block;
      //     width: 26px;
      //     height: 26px;
      //   }
      // }
      p:nth-of-type(2) {
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(177, 177, 177, 1);
        line-height: 80px;
      }
    }
    .box3 {
      width: 280px;
      text-align: right;
      p:nth-of-type(1) {
        line-height: 40px;
      }
      p:nth-of-type(2) {
        font-size: 22px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        line-height: 40px;
      }
      button {
        padding: 0 10px;
        margin-top: 20px;
        // width: 106px;
        font-size: 26px;
        height: 48px;
        background: linear-gradient(
          90deg,
          rgba(214, 174, 123, 1) 0%,
          rgba(238, 204, 153, 1) 100%
        );
        border-radius: 6px;
      }
      .bgnone {
        background: none;
        color: #d6ae7b;
      }
    }
  }
}
</style>