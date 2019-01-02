<template>
  <div id="searchShop">
    <com-head :opacity="0"></com-head>
    <div class="iteminp">
      <input type="text" v-model="search" placeholder="请输入你想要搜索的物品或商家" autofocus="autofocus">
      <span @click="sureSearch">
        <i class="iconfont icon-sousuo"></i>
      </span>
    </div>
    <div class="user">
      <router-link class="boxmes" v-for="item in shop" :key="item.id" :to="{name:'shopDetail',query:{shopid: item.id}}">
        <div class="left">
          <img :src="item.img">
        </div>
        <div class="right">
          <p>{{item.shop_name}}</p>
          <p>商品：{{shop.name}}</p>
          <p>申请时间：{{item.create_time}}</p>
          <p>进入店铺</p>
        </div>
      </router-link>
    </div>
    <div class="goods">
      <div class="item" v-for="item in goods" :key="item.id">
        <div class="img"  @click="toGooddetail(item.id)">
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
    <div v-if="!shop.length&&!goods.length" style="margin-top: 30vh; text-align: center; color: #888;">暂无搜索信息</div>
  </div>
</template>

<script>
export default {
  name: "searchShop",
  data() {
    return {
      id: this.$route.query.id,
      shop: [],
      goods: [],
      search: this.$route.query.keyword
    };
  },

  computed: {},

  created() {},

  mounted() {  
    this.loading();
  },

  methods: {
    // 搜索
    loading() {
      this.axios
        .post("/shop/serch_goods", {
          token: this.token(),
          keyword: this.search
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.shop = data.data.shop;
            this.goods = data.data.goods;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toGooddetail(id){
      this.$router.push({name:'goodDetail',query: {id: id}});
    },
    toGoodpay(id){
      this.$router.push({name:'payment',query: {id: id}});
    },
    sureSearch() {
      if(!this.search){
        this.$bus.$emit("toast", '搜索词不能为空');
      } else {
        this.$router.replace({name: 'searchShop',query:{keyword: this.search}});
      }
    }
  }
};
</script>
<style lang='scss' scoped>
#searchShop {
  width: 750px;
  background-color: #f6f6f6;
  padding-top: 82px;
  color: #fff;
  // background-image: url("../../assets/image/shopbg1.png");
  background-repeat: no-repeat;
  background-size: 750px 450px;
  .iteminp {
    position: fixed;
    top: 11px;
    left: 84px;
    padding: 0 0 0 30px;
    box-sizing: border-box;
    background: #ddd;
    line-height: 60px;
    border-radius: 30px;
    z-index: 100;
    
    input {
      padding-left: 10px;
      line-height: 60px;
      width: 470px;
      background: none;
      font-size: 26px;
      color: #000;
    }
    span {
      display: inline-block;
      width: 110px;
      text-align: center;
      .iconfont {
      font-size: 36px;
      line-height: 60px;
      color: #666;
      }
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers */
      color: #888;
      font-size: 28px;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #888;
      font-size: 28px;
    }

    input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #888;
      font-size: 28px;
    }

    input:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: #888;
      font-size: 28px;
    }
  }
  .user {
    margin: 20px 30px;
    background-color: #fff;
    .boxmes {
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      // align-items: center;
      border-radius: 10px;
      box-shadow: 2px 0px 30px #999;
      .left {
        width: 300px;
        height: 300px;
        padding: 20px;
        box-sizing: border-box;
        border-radius: 10px;
        overflow: hidden;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .right {
        padding: 20px;
        box-sizing: border-box;
        width: 380px;
        color: #000;
      }
      .right p:nth-of-type(1) {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #000;
        line-height: 60px;
      }
      .right p:nth-of-type(2),.right p:nth-of-type(3), {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 50px;
      }
      .right p:nth-of-type(4) {
        margin-top: 20px;
        margin-left: 60px;
        width: 200px;
        text-align: center;
        font-size: 26px;
        background-color: #D6AE7B;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: #fff;
        border-radius: 10px;
        line-height: 70px;
      }
    }
    .right2 {
      width: 212px;
      font-size: 26px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      //   border-left: 1Px solid rgba(153, 153, 153, 1);
      text-align: center;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 2px;
        height: 60px;
        background: rgba(153, 153, 153, 1);
      }
      p:nth-of-type(2) {
        color: #d6ae7b;
        line-height: 40px;
      }
    }
  }
  .goods {
    margin: 20px 30px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item {
      margin-top: 20px;
      width: 334px;
      height: 548px;
      background: rgba(42, 42, 42, 1);
      border-radius: 8px;
      box-shadow: 2px 5px 50px #999;
      overflow: hidden;

      .img {
        width: 334px;
        height: 334px;
        background-color: #fff;
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