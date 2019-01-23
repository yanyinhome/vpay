<template>
  <div id="myAddress">
    <com-head :opacity="1">我的地址</com-head>
    <div class="address" v-for="(item,index) in address" :key="index">
      <div class="box1" :class="{active: active==index}" @click="selectAddress(index,item.id)">
        <p>
          <span>{{item.name}}</span>&emsp;
          <span>{{item.phone}}</span>
        </p>
        <p>{{item.province+item.city+item.area+item.address}}</p>
      </div>
      <div class="box2">
        <div class="left" @click="defaultMes(index,item.id)">
          <i v-if="item.checked" class="iconfont icon-fuxuankuang"/>
          <i v-else class="iconfont icon-fangkuang"/>
          <span>设为默认</span>
        </div>
        <div class="right">
          <router-link tag="div" :to="{name: 'addAddress',query: {status:'0',id:item.id}}">
            <i class="iconfont icon-icon_edit"/>
            <span>修改</span>
          </router-link>
          <div @click="delectItem(index,item.id)">
            <i class="iconfont icon-iconfont-shanchu"/>
            <span>删除</span>
          </div>
        </div>
      </div>
    </div>
    <butFoot :click="addAddress">
      <i class="iconfont icon-add"/>添加新地址
    </butFoot>
  </div>
</template>

<script>
export default {
  name: "myAddress",
  data() {
    return {
      active: "-1",
      address: []
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    selectAddress(index, id) {
      console.log(11);
      this.active = index;
      const message = {
        name: this.address[index].name,
        phone: this.address[index].phone,
        province: this.address[index].province,
        city: this.address[index].city,
        area: this.address[index].area,
        address: this.address[index].address,
        id: this.address[index].id
      };
      if (!localStorage.address) {
        localStorage.message = JSON.stringify(message);
      } else {
        localStorage.removeItem("message");
        localStorage.message = JSON.stringify(message);
      }
    },
    loading() {
      this.axios
        .post("/user/my_address", {
          token: this.token()
        })
        .then(({ data }) => {
          
          if (data.code == "200") {
            this.address = data.data;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    // 设为默认地址
    defaultMes(index, id) {
      this.$bus.$emit("comAlert", {
        info: "确定设为默认地址?",
        button: [
          {
            text: "确认",
            callback: () => {
              this.axios
                .post("/user/set_address", {
                  token: this.token(),
                  id: id
                })
                .then(({ data }) => {
                  
                  if (data.code == "200") {
                    this.loading();
                    this.$bus.$emit("toast", data.msg);
                  } else if (data.code == "204") {
                    this.$bus.$emit("toast", data.msg);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
    },
    // 删除地址
    delectItem(index, id) {
      this.$bus.$emit("comAlert", {
        info: "确定删除该地址?",
        button: [
          {
            text: "确认",
            callback: () => {
              this.axios
                .post("/user/del_address", {
                  token: this.token(),
                  id: id
                })
                .then(({ data }) => {
                  
                  if (data.code == "200") {
                    this.address.splice(index, 1);
                    this.$bus.$emit("toast", data.msg);
                  } else if (data.code == "204") {
                    this.$bus.$emit("toast", data.msg);
                  }
                })
                .catch(function(error) {
                  console.log(error);
                });
            }
          },
          {
            text: "取消",
            callback: () => {}
          }
        ]
      });
    },
    addAddress() {
      this.$router.push("addAddress");
    }
  }
};
</script>
<style lang='scss' scoped>
#myAddress {
  padding-top: 72px;
  background-color: #f6f6f6;
  .address {
    background: #fff;
    .box1 {
      margin: 10px 20px;
      padding: 10px 10px;
      border-bottom: 1Px solid rgba(0, 0, 0, 0.1);
      p:nth-of-type(1) {
        font-size: 28px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(3, 3, 3, 1);
        line-height: 60px;
      }
      p:nth-of-type(2) {
        word-break: break-all;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(136, 136, 136, 1);
        line-height: 60px;
      }
    }
    .active {
      p {
        color: #daaf77 !important;
      }
    }
    .box2 {
      margin: 0 30px;
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      color: rgba(153, 153, 153, 1);
      .left {
        display: flex;
        align-items: center;
      }
      .right {
        width: 250px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        div {
          width: 100px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
      }
      .iconfont {
        font-size: 40px;
        // line-height: 80px;
      }
      .icon-fuxuankuang {
        color: #d6af7c;
        font-size: 36px;
      }
    }
  }
}
</style>