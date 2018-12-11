<template>
  <div id="index">
    <navlist :user= 'user'></navlist>
    <!-- <button @click="shownav">左侧导航</button> -->
    <div class="index">
      <div class="indextop" @click="shownav">
        <div class="user">
          <div class="left">
            <img :src="user.img">
          </div>
          <div class="right">
            <p>ID：{{user.phone}}</p>
            <p>信用：<img src="../assets/image/grade.png" v-for="(item,index) in grade" :key="index"></p>
          </div>
        </div>
      </div>
      <noticeSwiper :news="news" class="gonggao"></noticeSwiper>
      <div class="turnto">
        <p>账户余额操作</p>
        <div class="box">
          <div class="item item1">
            <img src="../assets/image/out.png">转出
          </div>
          <div class="item">
            <img src="../assets/image/shou.png">收款
          </div>
        </div>
      </div>
      <div class="turnto">
        <p>积分余额操作</p>
        <div class="box">
          <div class="item item1">
            <img src="../assets/image/buy.png">买入
          </div>
          <div class="item">
            <img src="../assets/image/sell.png">卖出
          </div>
        </div>
      </div>
      <div class="turnto">
        <div class="box1">
          <div class="item">
            <img src="../assets/image/zichan.png">
            <div>资产交易</div>
          </div>
          <div class="item">
            <img src="../assets/image/shoping.png">
            <div>商城</div>
          </div>
        </div>
      </div>
    </div>
    <com-foot :select="0"></com-foot>
  </div>
</template>

<script>
import navlist from "../components/navlist";
import noticeSwiper from "../components/notice";
export default {
  name: "index",
  data() {
    return {
      user: {
        img: require("../assets/image/zanshi/touxiang.jpg"),
        phone: "1888888",
      },
      grade: [],
      news: [
        "2018年7月30日更新升级版本1.0，各种新功能均已上线",
        "2018年9月30日更新升级版本2.0",
        "vpay,2018年11月30日更新升级版本3.0"
      ]
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.loading();
  },

  methods: {
    loading(){
      this.axios.post('/user/index',{
        token: this.token()
				})
				.then(({data})=>{
          console.log(data);
					if (data.code=='200'){
            this.user.img = data.data.head_img;	           						
            this.user.tel = data.data.phone;	   				
            this.news = data.data.news;	
            for (let index = 0; index < data.data.credit; index++) {
              this.grade.push(1);
            }	           						
					} else if(data.code=='204'){
						this.$bus.$emit('toast', data.msg);	
					}
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    shownav() {
      this.$bus.$emit("navlist");
    }
  }
};
</script>
<style lang='scss' scoped>
#index {
  padding: 10px 30px 150px;
  .index {
    .indextop {
      height: 586px;
      .user {
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
    }
    .turnto {
      margin-top: 20px;
      padding: 10px;
      box-sizing: border-box;
      // width:690px;
      // height:172px;
      background: rgba(42, 42, 42, 1);
      border-radius: 6px;
      p {
        padding-left: 5px;
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(234, 205, 163, 1);
        line-height: 60px;
        border-bottom: 1px solid rgba(68, 68, 68, 1);
      }
      .box {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 26px 0 16px;
        .item {
          width: 50%;
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 30px;
          img {
            margin-right: 30px;
            width: 50px;
            height: 50px;
          }
        }
        .item1 {
          border-right: 1px solid rgba(68, 68, 68, 1);
        }
      }
      .box1 {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .item {
          width: 326px;
          height: 174px;
          background: rgba(42, 42, 42, 1);
          border-radius: 6px;
          color: #fff;
          text-align: center;
          img {
            margin-top: 30px;
            width: 70px;
            height: 70px;
          }
        }
      }
    }
  }
}
</style>