<template>
  <div id="goodsHome">
    <div class="user">
      <router-link class="boxmes" tag="div" to="userMessage">
        <div class="left">
          <img :src="user.img">
        </div>
        <div class="right">
          <p>UID：{{user.UID}}</p>
          <p>注册币：{{grade}}</p>
        </div>
      </router-link>
      <router-link class="iconfont icon-sousuo" tag="i" to="search"></router-link>
    </div>
    <div class="goods">
      <div class="item" v-for="item in goods" :key="item.id">
        <div class="img" @click="toGooddetail(item.id)">
          <img :src="item.imgurl">
        </div>
        <div class="detail">
          <p>{{item.name}}</p>
          <p>{{item.content}}</p>
          <p @click="toGoodpay(item.id)">
            <span>&yen;{{item.price}}</span>
            <span class="iconfont icon-gouwuche"></span>
          </p>
        </div>
      </div>
    </div>
    <com-foot :select="2"></com-foot>
  </div>
</template>

<script>
export default {
  name: "goodsHome",
  data() {
    return {
      user: {
        img: "",
        UID: "",
      },
      grade: "",
      goods: []
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.goodlist();
  },

  methods: {
    goodlist() {
      this.axios
        .post("/shop/shop_index", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.user.img = data.data.head_img;
            this.user.UID = data.data.UID;
            this.goods = data.data.goods;
            this.grade = data.data.reg_num;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toGooddetail(id) {
      this.$router.push({ name: "goodDetail", query: { id: id } });
    },
    toGoodpay(id) {
      this.$router.push({ name: "payment", query: { id: id } });
    }
  }
};
</script>
<style lang='scss' scoped>
#goodsHome {
  padding: 90px 30px 150px;
  .user {
    width: 100%;
    position: fixed;
    top: 0px;
    left: 25px;
    background: #14171a;
    .boxmes {
      padding: 20px 0;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .left {
        margin-right: 20px;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right p {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(214, 174, 123, 1);
        line-height: 36px;
        display: flex;
        align-items: center;
        img {
          display: inline-block;
          width: 26px;
          height: 26px;
        }
      }
    }
    .icon-sousuo {
      position: fixed;
      top: 30px;
      right: 30px;
      color: #fff;
      font-size: 40px;
    }
  }
  .goods {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      margin-top: 20px;
      width: 334px;
      height: 548px;
      background: rgba(42, 42, 42, 1);
      border-radius: 8px;
      overflow: hidden;
      .img {
        width: 334px;
        height: 334px;
        background-color: #fff;
        overflow: hidden;
        img {
          width: 100%;
          vertical-align: middle;
          height: 334px;
        }
      }
    }
    .detail {
      margin-top: 5px;
      padding: 0 20px;
      color: #fff;
      p:nth-of-type(1) {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
        line-height: 60px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      p:nth-of-type(2) {
        font-size: 24px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(176, 176, 176, 1);
        line-height: 40px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      p:nth-of-type(3) {
        color: #f10f0f;
        line-height: 76px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:nth-of-type(2) {
          color: #fff;
          font-size: 56px;
        }
      }
    }
  }
}
</style>