<template>
  <div id="goodsHome">
    <div class="user">
      <router-link class="boxmes" tag="div" to="userMessage">
        <div class="left">
          <img :src="user.img">
        </div>
        <div class="right">
          <p>UID：{{user.UID}}</p>
          <p>
            信用：
            <img src="../../assets/image/grade.png" v-for="(item,index) in grade" :key="index">
          </p>
        </div>
      </router-link>
      <i class="iconfont icon-sousuo"></i>
    </div>
    <div class="goods">
      <div class="item">
        <div class="img">
          <img src>
        </div>
        <div class="detail">
          <p>少油烟锅具套装</p>
          <p>七件套：欧式精铸炒锅+ Carat钻石汤锅+Carat钻石</p>
          <p>
            <span>&yen;599</span>
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
        UID: ""
      },
      grade: []
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
        .post("/user/index", {
          token: this.token()
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.user.img = data.data.head_img;
            this.user.UID = data.data.UID;
            for (let index = 0; index < data.data.credit; index++) {
              this.grade.push(1);
            }
          } else if (data.code == "204") {
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
#goodsHome {
  padding: 20px 30px 150px;
  .user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .boxmes {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .left {
        margin-right: 20px;
        width: 70px;
        height: 70px;
        border-radius: 35px;
        overflow: hidden;
        img {
          width: 100%;
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
      .img {
        width: 334px;
        height: 334px;
        overflow: hidden;
        img {
          width: 100%;
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