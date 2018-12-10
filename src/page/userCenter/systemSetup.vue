<template>
  <div id='systemSetup'>
    <com-head :opacity='1'>系统设置</com-head>
    <div class="usermenu">
        <router-link class="item" tag="div" :to="{name: 'rewritePassword',query:{status: '0'}}"><span>修改登录密码</span><i class="iconfont icon-next"></i></router-link>
        <router-link class="item" tag="div" :to="{name: 'rewritePassword',query:{status: '1'}}"><span>修改支付密码</span><i class="iconfont icon-next"></i></router-link>
    </div>
    <div class="usermenu">
        <router-link class="item" tag="div" to=""><span>版本信息</span><span style="color:rgba(136,136,136,1);">{{edition}}</span></router-link>
        <router-link class="item" tag="div" to=""><span>关于我们</span><i class="iconfont icon-next"></i></router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "systemSetup",
  data() {
    return {
        edition: '1.0'
    };
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
   
  }
};
</script>
<style lang='scss'>
#systemSetup {
    padding-top: 82px;
    background-color: #f6f6f6;
    color: #000;
  .usermenu {
    margin-top: 20px;
    padding: 0 32px;
    box-sizing: border-box;
    background-color: #fff;
    .item {
      width: 686px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1Px solid rgba(238, 238, 238, 1);
      line-height: 100px;
      span {
        // width: 120px;
        text-align: left;
        font-size: 28px;
      }
      .iconfont {
        color: #ddd;
        font-size: 40px;
      }
    }
    .item:nth-of-type(2) {
      border-bottom: none;
    }
  }

  
}
</style>