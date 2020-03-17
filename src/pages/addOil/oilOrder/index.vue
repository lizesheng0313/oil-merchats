<template>
  <div class="add-oil">
    <location></location>
    <div class="adv-fixed">
      <adv></adv>
    </div>
    <div class="add-info">
      <div class="add-info_address" @click="handleGoSelectPreferential">
        <div class="add-info_address-left">
          <img src="../../../assets/images/coupons.png" mode="widthFix" class="oil" />
          <span>{{coupons}}</span>
        </div>
        <img src="../../../../static/images/icon/btn_next.png" class="btn_next" alt />
      </div>
      <div class="add-info_address">
        <div class="add-info_address-left">
          <img src="../../../assets/images/note.png" mode="widthFix" class="oil" />
          <input type="text" placeholder="请输入加油备注" v-model="querObj.note" class="note" />
        </div>
        <span></span>
      </div>
      <div class="add-info_address" @click="handleDateTimeShow">
        <div class="add-info_address-left">
          <img src="../../../assets/images/time.png" mode="widthFix" class="oil" />
          <span>{{querObj.timeSlot}}</span>
        </div>
        <img src="../../../../static/images/icon/btn_next.png" class="btn_next" alt />
      </div>
      <div class="add-info_address">
        <div class="add-info_address-left">
          <input type="checkbox" class="radio" :checked="isChecked" color="#2D78ED" />
          <p>同意并阅读《相关条款》</p>
        </div>
        <span></span>
      </div>
    </div>
    <div class="next" @click="handleSubmit">提交订单</div>
    <date-time ref="picker" @onConfirm="onConfirm"></date-time>
  </div>
</template>
<script>
import adv from "@/components/basic/adv";
import location from "@/components/basic/location";
import dateTime from "@/components/basic/dateTime";
import { mapState } from "vuex";
export default {
  components: {
    location,
    adv,
    dateTime
  },
  data() {
    return {
      querObj: {
        timeSlot: "预约时间",
        address: {
          province: "",
          city: "",
          country: "",
          addr: "",
          phone: "",
          receiver: "",
          lat: "",
          lnt: ""
        },
        paymentMethod: "",
        note: "",
        payer: "",
        couponId: ""
      },
      isChecked: false,
      coupons: "优惠卷"
    };
  },
  computed: {
    ...mapState({
      location: "location",
      preferentialObj: "preferentialObj",
      userInfo: "userInfo",
      agent: "agent"
    })
  },
  onShow() {
    this.coupons = this.preferentialObj.ticketName;
    this.querObj.couponId = this.preferentialObj.id;
  },
  mounted() {
    this.$store.commit("SETPROID", {
      id: "",
      ticketName: "优惠卷"
    });
    this.querObj.timeSlot = "预约时间";
    this.querObj.address.province = this.location.province;
    this.querObj.address.city = this.location.city;
    this.querObj.address.country = this.location.country;
    this.querObj.address.addr = this.location.content;
    this.querObj.address.lat = this.location.latitude;
    this.querObj.address.lnt = this.location.longitude;
    this.querObj.address.receiver = this.userInfo.realName;
    this.querObj.address.phone = this.userInfo.phone;
    this.coupons = this.preferentialObj.ticketName;
    this.querObj.couponId = this.preferentialObj.id;
    this.querObj.paymentMethod = this.$route.query.paymentMethod;
    if (this.querObj.paymentMethod === "02") {
      this.querObj.payer = this.agent.uid;
    } else {
      this.querObj.payer = "";
    }
  },
  methods: {
    onConfirm(e) {
      this.querObj.timeSlot = e;
    },
    handleDateTimeShow() {
      this.$refs.picker.show();
    },
    handleSubmit() {
      if (this.querObj.timeSlot === "预约时间") {
        wx.showToast({
          title: "请选择预约时间",
          icon: "none"
        });
        return;
      }
      wx.showLoading({
        title: "提交中",
        mask: true
      });
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: "orderService.add"
          },
          timeSlot: this.querObj.timeSlot,
          address: this.querObj.address,
          paymentMethod: this.querObj.paymentMethod,
          payer:this.querObj.payer,
          note: this.querObj.note
        })
        .then(res => {
          if (res.Head.state === "succ") {
            wx.showToast({
              mask: true,
              title: "提交订单成功"
            });
            this.$router.push({ path: "/pages/order/main", isTab: true });
          }
        });
    },
    handleGoSelectPreferential() {
      this.$router.push({
        path: "/pages/mine/preferential/main",
        query: { add: "true" }
      });
    },
    radioChange(e) {
      this.pattern = e.target.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.add-oil {
  position: relative;
  map {
    width: 100%;
    height: 100vh;
  }
  .add-info {
    border-radius: 10px;
    position: fixed;
    bottom: 114px;
    color: #333;
    box-sizing: border-box;
    left: 10px;
    right: 10px;
    background: #fff;
    padding: 0px 15px;
    .oil {
      width: 20px;
      height: 20px;
    }
    &_address {
      align-items: center;
      display: flex;
      height: 56px;
      border-bottom: 1px solid #e7e7e7;
      justify-content: space-between;
      &-left {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          margin-right: 20px;
          @include ellipsis;
          max-width: 75%;
        }
        .note {
          width: 290px;
        }
        img {
          margin-right: 11.5px;
        }
      }
    }
    .radio {
      transform: scale(0.7);
    }
    p {
      color: #999;
    }
  }
  .next {
    @include next;
  }
  .adv-fixed {
    position: fixed;
    bottom: 350px;
    width: 100%;
    height: 90px;
  }
}
</style>
