<template>
  <div>
    <div class="message-details">
      <div class="flex-box contact border-radius">
        <div class="flex-box">
          <img src alt class="head_img" />
          <div class="name">
            <p>{{orderDetails.realName}}</p>
            <span>{{orderDetails.driverPhone}}</span>
          </div>
        </div>
      </div>
      <div class="order-wapper" style="margin:0;border-radius: 0 0 10px 10px">
        <div class="add-info flex-between">
          <div class="add-info_address-left">
            <span>油价</span>
          </div>
          <input type="text" :placeholder="orderDetails.price+'/升'" disabled />
        </div>
        <div class="add-info flex-between">
          <div class="add-info_address-left">
            <img src="../../../../assets/images/price.png" mode="widthFix" class="oil" />
            <span>订单总价</span>
          </div>
          <span>￥{{orderDetails.shouldPay}}</span>
        </div>
        <div class="add-info flex-between">
          <div class="add-info_address-left">
            <img src="../../../../assets/images/note.png" mode="widthFix" class="oil" />
            <span>优惠卷</span>
          </div>
          <input type="text" :placeholder="orderDetails.faceValue" disabled />
        </div>
      </div>
      <div class="order-wapper">
        <p class="title">配送信息</p>
        <div class="add-info flex-between">
          <div class="add-info_address-left">
            <span>配送时间</span>
          </div>
          <input type="text" :placeholder="orderDetails.arrivalTime" />
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
      <div class="footer">
        <span @click="handleCancle">拒绝</span>
        <span @click="handleSure">同意</span>
      </div>
    </div>
  </div>
</template>
<script>
import adv from "@/components/basic/adv";
export default {
  components: {
    adv
  },
  data() {
    return {
      orderDetails: {}
    };
  },
  mounted() {
    this.fetchOrderDetails();
  },
  methods: {
    handleCancle() {
      let that = this;
      wx.showModal({
        title: "拒绝提示",
        content: "是否拒绝代付",
        showCancel: true,
        success() {
          wx.showLoading({
            title: "拒绝中",
            mask: true
          });
          that.$store
            .dispatch("actionRequest", {
              head: {
                service: "appGroup",
                subService: "orderService.refusePayment"
              },
              orderId: that.$route.query.orderId
            })
            .then(res => {
              that.$router.back();
            });
        }
      });
    },
    handleSure() {
      let that = this;
      wx.showModal({
        title: "确认提示",
        content: "是否确认代付",
        showCancel: true,
        success() {
          wx.showLoading({
            title: "确认中",
            mask: true
          });
          that.$store
            .dispatch("actionRequest", {
              head: {
                service: "appGroup",
                subService: "orderService.approvePayment"
              },
              orderId: that.$route.query.orderId
            })
            .then(res => {
              that.$router.back();
            });
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
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.message-details {
  padding: 0px 10px 28px 10px;
  background: #f7f8f9;
  margin-bottom: 70px;
  .footer {
    padding: 0 30px;
    position: fixed;
    z-index: 2;
    left: 0;
    bottom: 0;
    right: 0;
    height: 60px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      width: 150px;
      border-radius: 50px;
      height: 38px;
      background: $mainColor;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      box-shadow: 0 8px 14px 0 rgba(67, 128, 255, 0.4);
      font-size: 15px;
    }
    span:first-child {
      background: #a5a5a5;
      color: #fff;
      box-shadow: none;
    }
  }
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
  .submit {
    margin-top: 90px;
  }
}
</style>
