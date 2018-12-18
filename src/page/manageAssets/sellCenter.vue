<template>
  <div id="sellCenter">
    <com-head :opacity="0">卖出中心</com-head>
    <div class="sellCenter" v-for="(item,index) in message" :key="index">
      <div class="box1">
        <img :src="item.head_img">
      </div>
      <div class="box2">
        <p>{{item.UID}}</p>
        <p>
          信用：
          <img src="../../assets/image/grade.png" v-for="(item,index) in  item.credit*1" :key="index">
        </p>
        <p>{{item.create_time}}</p>
      </div>
      <div class="box3">
        <p>金额：{{item.num}}</p>
        <!-- <p>实付金额：{{item.create_time}}</p> -->
        <div>
          <button @click="showAlert(item.rate,item.id)">卖出</button>
        </div>
      </div>
      <div class="show" v-show="show">
        <div class="box">
          <div class="item">
            卖出金额：
            <input type="text" v-model="money" placeholder="请输入卖出金额" @blur="moneyCheck()">
          </div>
          <div class="item item1">
            实付金额：
            <input type="text" v-model="payment">
          </div>
          <div class="item">
            支付密码：
            <input type="password" v-model="password" placeholder="请输入支付密码">
          </div>
          <div class="item item1 item2">
            <button :disabled="isDisable" @click="buySome()">确定</button>
            <button @click="show=false">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sellCenter",
  data() {
    return {
      isDisable: false,
      show: false,
      message: [],
      rate: "",
      id: "",
      money: "",
      password: ""
    };
  },

  computed: {
    payment: function() {
      return (this.money * this.rate).toFixed(2);
    },
    somecharge: {
      get() {
        return ((this.someprice * this.shouxu) / 100).toFixed(2);
      }
    }
  },

  created() {
    this.loading();
  },

  mounted() {},

  methods: {
    loading() {
      this.axios
        .post("transaction/record", {
          token: this.token(),
          type: "2"
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.message = data.data;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    buySome() { 
      if (this.money) {
        this.$bus.$emit("toast", "请输入金额");
      } else if (this.password) {
        this.$bus.$emit("toast", "请输入二级密码");
      } else {
        this.isDisable = true;
        if (this.isDisable) {
          this.$bus.$emit("toast", "不能重复操作");
      }
        setTimeout(() => {
          this.isDisable = false;
        }, 1000);

      this.axios
        .post("transaction/matching", {
          token: this.token(),
          type: "1",
          num: this.money,
          id: this.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.show = false;
            this.$router.go(-1);
            this.$bus.$emit("toast", data.msg);
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
      }
    },
    showAlert(rate,id){
      this.id = id;
      this.rate = rate;
      this.show = true;
    }
  }
};
</script>
<style lang='scss' scoped>
#sellCenter {
  padding-top: 82px;
  color: #fff;
  .sellCenter {
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
      p:nth-of-type(2) {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(177, 177, 177, 1);
        line-height: 40px;
        display: flex;
        align-items: center;
        img {
          display: inline-block;
          width: 26px;
          height: 26px;
        }
      }
      p:nth-of-type(3) {
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
        margin-top: 20px;
        width: 106px;
        height: 48px;
        background: linear-gradient(
          90deg,
          rgba(214, 174, 123, 1) 0%,
          rgba(238, 204, 153, 1) 100%
        );
        border-radius: 6px;
      }
    }
    .show {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 50;
      background: rgba(0, 0, 0, 0.6);
      .box {
        width: 590px;
        box-sizing: border-box;
        padding: 30px 40px;
        background: rgba(63, 63, 63, 1);
        border-radius: 10px;
        position: absolute;
        top: 22%;
        left: 80px;
        text-align: center;
        .item {
          margin-top: 20px;
          height: 80px;
          line-height: 80px;
          border-bottom: 1px solid #666;
          input {
            margin-left: 20px;
            color: #fff;
            width: 320px;
            background: transparent;
          }
          input::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #888;
          }
          input:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #888;
          }

          input::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #888;
          }

          input:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color: #888;
          }
        }
        .item1 {
          border-bottom: none;
        }
        .item2 {
          margin-top: 50px;
          display: flex;
          justify-content: space-around;
          button {
            width: 180px;
            line-height: 70px;
            background: linear-gradient(
              90deg,
              rgba(214, 174, 123, 1) 0%,
              rgba(238, 204, 153, 1) 100%
            );
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>