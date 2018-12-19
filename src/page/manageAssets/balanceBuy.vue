<template>
  <div id="balanceBuy">
    <com-head :opacity="0">{{name}}</com-head>
    <div class="buy">
      <div class="box1">
        <div
          class="item"
          :class="{active: active==index}"
          @click="activeNav(index)"
          v-for="(item,index) in itemnav"
          :key="index"
        >{{item}}</div>
      </div>
      <div class="box2">
        <p>
          <span>请选择金额</span>
          <!-- <span>{{card}}</span> -->
        </p>
        <div class="box1">
          <div
            class="money"
            :class="{active2: active2==index}"
            @click="activeMoney(index,item)"
            v-for="(item,index) in money"
            :key="index"
          >{{item}}</div>
        </div>
      </div>
      <div class="account">
        <input type="password" v-model="account" placeholder="请输入二级密码">
      </div>
      <com-button :click="balanceBuy" :disabled="isDisable">创建订单</com-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "balanceBuy",
  data() {
    return {
      isDisable: false,
      status: this.$route.query.status,
      account: "",
      name: "",
      active: "0",
      active2: "-1",
      itemnav: [],
      // card: "请设置你的默认银行卡",
      money: [],
      moneySelect: ""
    };
  },

  computed: {},

  created() {
    this.loading();
    if (this.status === "1") {
      //挂卖
      this.name = "提现";
      this.itemnav = [
        "创建订单",
        "未匹配订单",
        "已匹配订单",
        "已完成订单",
        "卖出中心"
      ];
    } else if (this.status === "2") {
      //挂买
      this.name = "购买";
      this.itemnav = [
        "创建订单",
        "未匹配订单",
        "已匹配订单",
        "已完成订单",
        "买入中心"
      ];
    }
  },

  mounted() {},

  methods: {
    loading() {
      this.axios
        .post("transaction/index", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code === "200") {
            this.money = data.data;
          } else if (data.code === "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    balanceBuy() {
      this.isDisable = true;
      setTimeout(() => {
        this.isDisable = false;
      }, 1000);
      if (this.status === "1") {
        //挂卖
        this.axios
          .post("transaction/dotran", {
            token: this.token(),
            type: "1",
            num: this.moneySelect,
            sale_code: this.account
          })
          .then(({ data }) => {
            console.log(data);
            if (data.code === "200") {
              this.$router.push({ name: "sellList", query: { status: '1' } });
              this.$bus.$emit("toast", data.msg);
            } else if (data.code === "204") {
              this.$bus.$emit("toast", data.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } else if (this.status === "2") {
        //挂买
        this.axios
          .post("transaction/dotran", {
            token: this.token(),
            type: "2",
            num: this.moneySelect,
            sale_code: this.account
          })
          .then(({ data }) => {
            console.log(data);
            if (data.code === "200") {
              this.$router.push({ name: "sellList", query: { status: '2' } });
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
    activeNav(index) {
      this.active = index;
      if (this.status === "1") {
        //挂卖
        if (index == "1" || index == "2" || index == "3") {
          //未匹配，已匹配，已完成
          this.$router.push({ name: "sellList", query: { status: index } });
        } else if (index == "4") {
          //买卖中心
          this.$router.push("sellCenter");
        }
      } else if (this.status === "2") {
        //挂买
        if (index == "1" || index == "2" || index == "3") {
          //未匹配，已匹配，已完成
          this.$router.push({ name: "buyList", query: { status: index } });
        } else if (index == "4") {
          //买卖中心
          this.$router.push("buyCenter");
        }
      }
    },
    activeMoney(index, money) {
      this.active2 = index;
      this.moneySelect = money;
    }
  }
};
</script>
<style lang='scss' scoped>
#balanceBuy {
  padding: 92px 0px 0;
  color: #fff;
  text-align: center;
  .box1 {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .item {
      margin-top: 20px;
      margin-left: 30px;
      width: 210px;
      line-height: 60px;
      background: rgba(42, 42, 42, 1);
      border-radius: 10px;
      box-sizing: border-box;
    }
    .active {
      color: #d6ae7b;
    }
  }
  .box2 {
    padding: 10px 14px;
    margin: 30px 30px;
    // width: 690px;
    background: rgba(42, 42, 42, 1);
    border-radius: 10px;
    p {
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      box-sizing: border-box;
      font-size: 28px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      line-height: 90px;
      border-bottom: 1px solid rgba(68, 68, 68, 1);
      span:nth-of-type(2) {
        color: #999;
      }
    }
    .box1 {
      margin-top: 10px;
      padding-bottom: 10px;
    }
    .money {
      margin: 10px 20px;
      width: 180px;
      line-height: 60px;
      background: rgba(42, 42, 42, 1);
      border-radius: 10px;
      box-sizing: border-box;
      color: #d6ae7b;
      border: 2px solid rgba(214, 174, 123, 1);
    }
    .active2 {
      color: #fff;
      background: rgba(214, 174, 123, 1);
    }
  }
  .account {
    width: 690px;
    height: 80px;
    margin: 30px auto;
    input {
      padding-left: 30px;
      box-sizing: border-box;
      width: 100%;
      line-height: 80px;
      background: rgba(42, 42, 42, 1);
      border-radius: 10px;
      color: #fff;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #999;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #999;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #999;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #999;
    }
  }
}
</style>