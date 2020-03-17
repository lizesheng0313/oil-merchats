<template>
  <div class="order_details">
    <div class="location">
      <location></location>
    </div>
    <div class="adv">
      <adv :isNotMargin="true"></adv>
    </div>
    <div class="order_info">
      <!-- 已取消 -->
      <div class="success" v-if="orderDetails.status === '02'">
        <img src="../../../assets/images/success.png" class="success_icon" alt />
        <span>取消成功</span>
        <p>完成时间 {{orderDetails.arrivalTime}}</p>
      </div>
      <!-- 已完成 待评价-->
      <div
        class="success"
        v-if="orderDetails.status == '14' || (orderDetails.status == '09' && orderDetails.payStatus == '5')"
      >
        <img src="../../../assets/images/success.png" class="success_icon" alt />
        <span>支付成功</span>
        <p>完成时间 {{orderDetails.arrivalTime}}</p>
      </div>
      <!-- 待评价 -->
      <div v-if="orderDetails.status == '09' && orderDetails.payStatus == '5' ">
        <div class="flex-box contact">
          <img src alt class="head_img" />
          <div class="name">
            <p>{{orderDetails.realName}}</p>
            <span>{{orderDetails.driverPhone}}</span>
          </div>
        </div>
        <div class="flex-between star">
          <div>给师傅评价</div>
          <star></star>
        </div>
        <div class="next submit">提交评价</div>
      </div>
      <!-- 未接单 -->
      <div
        class="flex-box border-radius no_order"
        v-if="orderDetails.status == '01' || orderDetails.status == '03'"
      >
        <p>未接单</p>
        <div class="cancle_order" @click="cancleOrder">取消订单</div>
      </div>
      <!-- 已完成 -->
      <div class="flex-box contact border-radius" v-if="orderDetails.status == '14'">
        <div class="flex-box">
          <img src alt class="head_img" />
          <div class="name">
            <p>{{orderDetails.realName}}</p>
            <span>{{orderDetails.driverPhone}}</span>
          </div>
        </div>
        <img src="../../../assets/images/phone.png" alt class="phone1" />
      </div>
      <!-- //配送中 待支付 -->
      <div
        class="flex-box contact border-radius"
        v-if="(orderDetails.status == '09' && orderDetails.payStatus == '4' || orderDetails.status =='05' && orderDetails.status =='06')"
      >
        <img src alt class="head_img" />
        <div>
          <p>{{orderDetails.realName}}</p>
          <span>{{orderDetails.driverPhone}}</span>
        </div>
        <img src="../../../assets/images/phone.png" alt class="phone" />
        <div class="cancle_order" @click="cancleOrder">取消订单</div>
      </div>
      <!-- 待支付 已完成-->
      <div>
        <div
          class="flex-box contact"
          v-if="orderDetails.status == '09' && orderDetails.payStatus == '4' || orderDetails.status =='14'"
        >
          <img src alt class="head_img" />
          <div class="name">
            <p>{{orderDetails.receiver}}</p>
            <span>{{orderDetails.addr}}</span>
          </div>
        </div>
        <div
          class="order-wapper"
          style="margin:0;border-radius: 0 0 10px 10px"
          v-if="orderDetails.status == '09' && orderDetails.payStatus == '4' || orderDetails.status =='14'"
        >
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <img src="../../../assets/images/coupons.png" mode="widthFix" class="oil" />
              <span>油价</span>
            </div>
            <input type="text" :placeholder="orderDetails.price+'/升'" disabled />
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <img src="../../../assets/images/note.png" mode="widthFix" class="oil" />
              <span>加油卷</span>
            </div>
            <input type="text" :placeholder="orderDetails.faceValue" disabled />
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <img src="../../../assets/images/bank.png" mode="widthFix" class="oil" />
              <span>付款方式</span>
            </div>
            <input type="text" placeholder="余额" disabled v-if="orderDetails.payType == '01'" />
            <input type="text" placeholder="微信支付" disabled v-else-if="orderDetails.payType == '02'" />
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <img src="../../../assets/images/price.png" mode="widthFix" class="oil" />
              <span>订单总价</span>
            </div>
            <span>￥{{orderDetails.shouldPay}}</span>
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <img src="../../../assets/images/pay.png" mode="widthFix" class="oil" />
              <span>支付金额</span>
            </div>
            <span>￥{{orderDetails.hasPay}}</span>
          </div>
        </div>
        <div
          class="next"
          v-if="orderDetails.status == '09' && orderDetails.payStatus == '4'"
          @click="isShowPay = true"
        >支付</div>
      </div>
      <!-- 待支付 已完成-->
      <!-- 非待评价-->
      <div v-if="!(orderDetails.status == '09' && orderDetails.payStatus == '5') ">
        <div class="order-wapper">
          <p class="title">配送信息</p>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <span>配送时间</span>
            </div>
            <input type="text" :placeholder="orderDetails.arrivalTime" disabled />
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <span>加油地址</span>
            </div>
            <input type="text" :placeholder="orderDetails.receiver" disabled />
          </div>
          <div class="add-info flex-between">
            <input type="text" :placeholder="orderDetails.addr" style="text-align:left" disabled />
          </div>
        </div>
        <div class="order-wapper order_bottom">
          <p class="title">订单信息</p>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <span>订单编号</span>
            </div>
            <input type="text" :placeholder="orderDetails.orderId" disabled />
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <span>创建时间</span>
            </div>
            <input type="text" :placeholder="orderDetails.createTime" disabled />
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <span>订单状态</span>
            </div>
            <input type="text" :placeholder="orderDetails.statusStr" disabled />
          </div>
          <div class="add-info flex-between">
            <div class="add-info_address-left">
              <span>订单备注</span>
            </div>
            <input type="text" :placeholder="orderDetails.note" disabled />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isShowPay" class="mask" catchtouchmove="ture">
      <div class="pay-box">
        <span class="iconfont iconguanbi" @click="isShowPay= false"></span>
        <p class="title">付款详情</p>
        <radio-group @change="radioChange" class="pay_radio">
          <label v-for="(item,index) in radioList" :key="index">
            <div>
              <input
                type="checkbox"
                :value="item.name"
                class="radio"
                :checked="payType==item.payType"
                color="#2D78ED"
              />
              <span class="name">{{item.name}}</span>
            </div>
            <span class="content">{{item.content}}</span>
          </label>
        </radio-group>
        <p class="order_price">
          <span>需付款:</span>
          <span>{{ orderDetails.shouldPay }}</span>
        </p>
        <div class="pay" @click="handlePay">确认付款</div>
      </div>
    </div>
  </div>
</template>
<script>
import location from "@/components/basic/location";
import adv from "@/components/basic/adv";
import star from "../components/star";
import { mapState } from "vuex";
export default {
  components: {
    location,
    adv,
    star
  },
  computed: {
    ...mapState({
      userInfo: "userInfo"
    })
  },
  data() {
    return {
      radioList: [
        {
          name: "微信支付",
          payType: "01"
        },
        {
          name: "余额支付",
          payType: "02"
        },
        {
          name: "赊呗支付",
          payType: "03"
        }
      ],
      payType: "01",
      isShowPay: false,
      orderDetails: {}
    };
  },
  mounted() {
    this.isShowPay = false;
    this.radioList[0].content = this.userInfo.phone;
    this.radioList[1].content = this.userInfo.totalAmount;
    this.fetchOrderDetails();
  },
  methods: {
    radioChange(e) {
      this.payType = e.target.value;
    },
    handlePay() {
      let that = this;
      wx.login({
        success(res) {
          that.$store
            .dispatch("actionRequest", {
              head: {
                service: "appGroup",
                subService: "msOrderService.pay"
              },
              code: res.code,
              orderId: that.$route.query.orderId,
              payType: that.payType
            })
            .then(res => {
              if (res.Head.state === "succ") {
                that.fetchOrderDetails();
              }
            });
        }
      });
    },
    cancleOrder() {
      wx.showLoading();
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: "orderService.cancel"
          },
          orderId: this.$route.query.orderId
        })
        .then(res => {
          if (res.Head.state === "succ") {
            this.fetchOrderDetails();
          }
        });
    },
    fetchOrderDetails() {
      wx.showLoading({
        mask: true
      });
      this.$store
        .dispatch("actionRequest", {
          queryId: "getOrderDetail",
          orderId: this.$route.query.orderId
        })
        .then(res => {
          this.orderDetails = res.Body.data[0];
          this.$store.commit("UPDATEDLOCATION", {
            latitude: this.orderDetails.driverLat,
            longitude: this.orderDetails.driverLnt,
            content: "司机实时位置"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.location {
  height: 450px;
  overflow: hidden;
}
.adv {
  position: absolute;
  left: 0;
  right: 0;
  top: 350px;
}
.star {
  margin-top: 8.5px;
  background: #fff;
  padding: 24px 15px;
  border-radius: 10px;
  font-size: 16px;
  color: #323232;
}
.order_details {
  position: relative;
}
.order_info {
  padding: 0px 10px 28px 10px;
  background: #f7f8f9;
  .order-wapper {
    margin-top: 10px;
    border-radius: 10px;
    padding: 0 13px;
    background: #fff;
    box-sizing: border-box;
    .add-info {
      height: 57.5px;
      color: #333;
      border-top: 1px solid #e7e7e7;
      align-items: center;
      &_address {
        align-items: center;
        display: flex;
        border-bottom: 1px solid #e7e7e7;
        justify-content: space-between;
        padding-bottom: 15px;
        &-left {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            margin-right: 20px;
            @include ellipsis;
            max-width: 75%;
          }
          img {
            margin-right: 11.5px;
          }
          .oil {
            width: 20px;
            height: 20px;
          }
        }
      }
      input {
        text-align: right;
      }
    }
  }
  .title {
    color: #989898;
    padding: 15px 0px;
    font-size: 18px;
  }
  .next {
    @include oil_btn;
    margin: 15px 0px 25px 0px;
  }
  .contact {
    background: #fff;
    align-items: center;
    padding: 8px 13px;
    .head_img {
      width: 37px;
      height: 37px;
      border-radius: 100px;
    }
    .name {
      position: relative;
      left: 40px;
    }
    p {
      color: #323232;
      font-size: 16px;
    }
    span {
      color: #999999;
      font-size: 13px;
    }
    .phone {
      position: relative;
      left: 20px;
    }
    .phone,
    .phone1 {
      width: 20px;
      height: 20px;
    }
  }
  .no_order {
    p {
      color: #323232;
      font-size: 18px;
      padding: 8px 13px;
    }
  }
  .cancle_order {
    width: 85px;
    height: 30px;
    border-radius: 15px;
    border: 1px solid #b0b0b0;
    color: #999;
    text-align: center;
    line-height: 30px;
  }
  .border-radius {
    align-items: center;
    background: #fff;
    justify-content: space-between;
    padding: 8px 13px;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #e7e7e7;
  }
  .border-radius:last-child {
    border-bottom: none;
  }
  .success {
    display: flex;
    flex-direction: column;
    padding: 25px 0;
    background: #fff;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-bottom: 10px;
    .success_icon {
      width: 62.5px;
      height: 78px;
    }
    span {
      margin-top: 2px;
      color: #323232;
      font-size: 16px;
    }
    p {
      margin-top: 10px;
      color: #ccc;
    }
  }
  .submit {
    margin-top: 90px;
  }
}
</style>
