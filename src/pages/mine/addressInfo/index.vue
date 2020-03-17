<template>
  <div class="address-info">
    <div class="content">
      <div class="flex-between">
        <span>联系人</span>
        <input type="text" placeholder="请输入联系人" v-model="addressInfo.receiver" class="flex" />
      </div>
      <div class="flex-between">
        <span>性别</span>
        <radio-group @change="radioChange">
          <label v-for="(item,index) in radioList" :key="index">
            <input
              type="radio"
              :value="item.name"
              class="radio"
              :checked="addressInfo.sex==item.name"
              color="#2D78ED"
            />
            {{item.title}}
          </label>
        </radio-group>
      </div>
      <div class="flex-between">
        <span>手机号</span>
        <input
          type="number"
          maxlength="11"
          placeholder="请输入手机号"
          class="flex"
          v-model="addressInfo.phone"
        />
      </div>
      <div class="flex-between">
        <span>地址</span>
        <div class="flex-box flex-align_center" @click="handleToSelectLocation">
          <input type="text" v-model="addressInfo.addr" placeholder="请输入您的地址" class="flex" disabled />
          <i class="iconfont iconyou"></i>
        </div>
      </div>
      <div class="flex-between">
        <span>标签</span>
        <input type="text" placeholder="请输入一个标签" v-model="addressInfo.tag" class="flex" />
      </div>
    </div>
    <div class="next" @click="handleSave">保存</div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      subService: "",
      addressInfo: {
        id: "",
        receiver: "",
        province: "",
        city: "",
        country: "",
        addr: "",
        phone: "",
        lnt: "",
        lat: "",
        tag: "",
        sex: ""
      },
      radioList: [
        {
          name: "1",
          title: "男"
        },
        {
          name: "2",
          title: "女"
        }
      ]
    };
  },
  computed: {
    ...mapState({
      addAddress: "addAddress"
    })
  },
  onShow() {
    this.addressInfo = { ...this.addressInfo, ...this.addAddress };
  },
  mounted() {
    if (this.$route.query.add) {
      if (this.$route.query.add === "yes") {
        this.addressInfo = {};
      }
      this.reset();
    }
    if (this.$route.query.addressInfo) {
      this.addressInfo = {
        ...this.addressInfo,
        ...JSON.parse(this.$route.query.addressInfo)
      };
    }
    this.subService =
      this.$route.query.add === "no" ? "addrService.update" : "addrService.add";
  },
  onUnload() {
    this.reset();
    this.addressInfo = {};
  },
  methods: {
    reset() {
      this.$store.commit("UPDATEADDRESS", {
        lat: "",
        lnt: "",
        addr: "",
        province: "",
        city: "",
        country: ""
      });
    },
    radioChange(e) {
      this.addressInfo.sex = e.mp.detail.value;
    },
    handleSave() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: this.subService
          },
          id: this.addressInfo.id,
          isDefault: "1",
          receiver: this.addressInfo.receiver,
          province: this.addressInfo.province,
          city: this.addressInfo.city,
          country: this.addressInfo.country,
          addr: this.addressInfo.addr,
          phone: this.addressInfo.phone,
          lnt: this.addressInfo.lnt,
          lat: this.addressInfo.lat,
          tag: this.addressInfo.tag,
          sex: this.addressInfo.sex
        })
        .then(res => {
          if (res.Head.state === "succ") {
            wx.showToast({
              title: "成功",
              icon: "success"
            });
            this.$router.back();
          }
        });
    },
    handleToSelectLocation() {
      this.$router.push({
        path: "/pages/addOil/selectLocation/main",
        query: {
          add: true
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped >
.address-info {
  min-height: calc(100vh - 9px);
  padding-top: 9px;
  background: #f7f8f9;
  .content {
    background: #fff;
    margin: 0px 9px 0 9px;
    color: #333;
    border-radius: 10px;
    span {
      color: #323232;
    }
    radio-group {
      margin-top: 0;
    }
    input.flex {
      text-align: right;
      margin-left: 30px;
    }
    .flex-align_center {
      input {
        width: 230px;
      }
    }
    label {
      margin-right: 15px;
    }
    .flex-between {
      padding: 10px;
      align-items: center;
      border-bottom: 1px solid #eee;
    }
  }
  .next {
    @include next;
  }
}
</style>
