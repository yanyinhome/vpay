<template>
  <div id="addressSelect">
    <!-- 省市县三级联动 -->
    <div class="mask" @click="cityalert=false" v-if="cityalert">
      <div class="addressAlert">
        <div class="box"><span>所在地区</span><button  v-on:click="sendMsg">确定</button></div> 
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" :visibleItemCount=3></mt-picker>
      </div>
    </div>
  </div>
</template>

<script>
import myaddress from "../assets/js/province.js"; //引入省市区数据
export default {
  name: "addressSelect",
  data() {
    return {

      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "——",
          className: "slot2"
        },
        {
          flex: 1,
          values: ["市辖区"],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "——",
          className: "slot4"
        },
        {
          flex: 1,
          values: ["东城区"],
          className: "slot5",
          textAlign: "center"
        }
      ],
      cityalert: true,
      myAddressProvince: "省",
      myAddressCity: "市",
      myAddresscounty: "区/县",
    };
  },

  computed: {},

  created() {},

  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  },

  methods: {
     chooceAddress() {
      this.cityalert = true;
    },
    onMyAddressChange(picker, values) {
      if (myaddress[values[0]]) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); // Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); // 区/县数据就是一个数组
        this.myAddressProvince = values[0];
        this.myAddressCity = values[1];
        this.myAddresscounty = values[2];
        console.log(this.myAddressProvince);
      }
    },
    sendMsg(){
      this.$emit("aaa",'666666666')
      console.log(11333333);
    }
  }
};
</script>
<style lang='scss' scoped>
#addressSelect {
  .mask {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    .addressAlert {
      width: 750px;
      padding: 30px;
      border-radius: 10px;
      position: absolute;
      top: 30vh;
      left: 30px;
      background-color: #fff;
      .box {
        margin: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button {
        padding: 5px 8px;
        border-radius: 3px;
        background-color: rgb(238, 236, 236);
      }
    }
  }
}
</style>