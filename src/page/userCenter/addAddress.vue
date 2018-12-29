<template>
  <div id="addAddress">
    <com-head :opacity="1">添加地址</com-head>
    <div class="addAddress">
      <div class="box">
        <span>收件人</span>
        <input type="text" v-model="name" placeholder="请输入收件人">
      </div>
      <div class="box">
        <span>手机号码</span>
        <input type="text" v-model="phone" placeholder="请输入手机号码">
      </div>
      <div class="box" @click="cityalert=true">
        <span>请选择地区</span>
        <i class="iconfont icon-next"/>
      </div>
      <div class="box">
        <span>省份</span>
        <span>{{Province}}</span>
      </div>
      <div class="box">
        <span>城市</span>
        <span>{{City}}</span>
      </div>
      <div class="box">
        <span>区域</span>
        <span>{{county}}</span>
      </div>
      <div class="beizhu">
        <textarea style="resize:none" border placeholder="请输入详细地址" v-model="content" rows="5"></textarea>
      </div>
    </div>
    <!-- 省市县三级联动 -->
    <div class="mask" v-if="cityalert">
      <div class="addressAlert">
        <div class="box">
          <span>所在地区</span>
          <button @click="cityalert=false">确定</button>
        </div>
        <mt-picker :slots="myAddressSlots" @change="onMyAddressChange" :visibleItemCount="7"></mt-picker>
      </div>
    </div>
    <!-- <addressSelect></addressSelect> -->
    <com-button :click="keepData">保存</com-button>
  </div>
</template>

<script>
import myaddress from "../../assets/js/province.js"; //引入省市区数据
// import addressSelect from "../../components/addressSelect.vue";
export default {
  name: "addAddress",
  data() {
    return {
      status: this.$route.query.status,
      name: "",
      phone: "",
      content: "",

      Province: "",
      City: "",
      county: "",
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 15,
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
          values: ["周口市"],
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
          values: ["太康县"],
          className: "slot5",
          textAlign: "center"
        }
      ],
      cityalert: false,
      myAddressProvince: "省",
      myAddressCity: "市",
      myAddresscounty: "区/县"
    };
  },

  computed: {},

  created() {
    if (this.status == "0") {
      this.loading();
    }
  },

  mounted() {
    console.log();
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数  （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 15;
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  },

  methods: {
    loading() {
      this.axios
        .post("/user/edit_address", {
          token: this.token(),
          id: this.$route.query.id
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.name = data.data.name;
            this.phone = data.data.phone;
            this.Province = data.data.province;
            this.City = data.data.city;
            this.county = data.data.area;
            this.content = data.data.address;
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    keepData() {
      let regTel = /^(1[3-9])\d{9}$/;
      if (!this.name) {
        this.$bus.$emit("toast", "收件人不能为空");
      } else if (!this.phone) {
        this.$bus.$emit("toast", "手机号不能为空");
      } else if (!regTel.test(this.phone)) {
        this.$bus.$emit("toast", "手机号码不合法");
      } else if (!this.Province) {
        this.$bus.$emit("toast", "请选择地址");
      } else {
        if (this.status == "0") {
          //修改地址
          this.xiugai();
        } else {
          //添加
          this.tianjia();
        }
      }
    },
    xiugai() {
      this.axios
        .post("/user/doedit_address", {
          token: this.token(),
          id: this.$route.query.id,
          name: this.name,
          phone: this.phone,
          province: this.Province,
          city: this.City,
          area: this.county,
          address: this.content
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.$router.push("myAddress");
            this.$bus.$emit("toast", data.msg);
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    tianjia() {
      this.axios
        .post("/user/add_address", {
          token: this.token(),
          name: this.name,
          phone: this.phone,
          province: this.Province,
          city: this.City,
          area: this.county,
          address: this.content
        })
        .then(({ data }) => {
          console.log(data);
          if (data.code == "200") {
            this.$router.push("myAddress");
            this.$bus.$emit("toast", data.msg);
          } else if (data.code == "204") {
            this.$bus.$emit("toast", data.msg);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
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
        if (values[0]) {
          this.Province = this.myAddressProvince;
        }
        if (values[1]) {
          this.City = this.myAddressCity;
        }
        if (values[2]) {
          this.county = this.myAddresscounty;
        }
      }
    }
  }
};
</script>
<style lang='scss' scoped>
#addAddress {
  padding-top: 82px;
  background-color: #f6f6f6;
  .addAddress {
    background-color: #fff;
    .box {
      margin: 0 30px;
      color: #000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2);
      line-height: 100px;
      input {
        width: 540px;
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
      input:nth-of-type(2) {
        margin-top: 40px;
      }
      input:nth-of-type(2) {
        margin-top: 40px;
      }
    }
    .iconfont {
      color: #ddd;
    }
    .beizhu {
      width: 690px;
      margin-top: 20px;
      margin: 0 auto;
      textarea {
        width: 100%;
        padding: 20px 0;
        box-sizing: border-box;
      }
    }
  }
  .mask {
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    .addressAlert {
      width: 690px;
      padding: 30px;
      // border-radius: 10px;
      position: absolute;
      bottom: 0;
      left: 0px;
      background-color: #fff;
      .box {
        margin: 0 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      button {
        padding: 10px 30px;
        border-radius: 6px;
        background: none;
      }
    }
  }
}
</style>