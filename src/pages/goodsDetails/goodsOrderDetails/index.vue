<template>
  <article class="goods-order_details">
    <!-- 支付成功 -->
    <div class="success" v-if="orderDetails.status === '05'">
      <img src="../../../assets/images/success.png" class="success_icon" alt />
      <span>支付成功</span>
      <p>完成时间{{orderDetails.modifyTime}}</p>
    </div>
    <!-- 取消订单 -->
    <div class="success" v-if="orderDetails.status=== '02'">
      <img src="../../../assets/images/success.png" class="success_icon" alt />
      <span>取消成功</span>
    </div>
    <!-- 等待支付 -->
    <div class="success" v-if="orderDetails.status === '01' || orderDetails.status === '03'">
      <img src="../../../assets/images/wait.png" class="success_icon" alt />
      <span>等待支付</span>
    </div>

    <div class="default-address-box">
      <div class="default-address">
        <img src="../../../assets/images/address2.png" class="address-icon" alt />
        <div>
          <span class="address contact">{{orderDetails.receiver}} {{orderDetails.phone}}</span>
          <p class="address">{{orderDetails.addr}}</p>
        </div>
        <span class="iconyoujiantou iconfont"></span>
      </div>
    </div>
    <div class="order-list">
      <div class="flex-box order-item">
        <div class="order-item-pic">
          <img :src="STATICURL+orderDetails.goodsImg" class="goods-pic" alt mode="widthFix" />
        </div>
        <div class="order-params">
          <p class="title">{{orderDetails.goodsName}}</p>
          <!-- <span>{{orderDetails.goodsDesc}}</span> -->
          <div class="order-price">
            <p class="price">
              ￥{{orderDetails.price}}
              <span class="num">x{{orderDetails.qty}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex-between flex-align_center order_footer">
        <span class="freight">运费</span>
        <span>{{orderDetails.deliverAmt}}</span>
      </div>
      <!-- 支付成功 -->
      <div v-if="orderDetails.status === '05'">
        <div class="flex-between flex-align_center order_footer">
          <span>实付款（含运费）</span>
          <span>¥{{orderDetails.totalSum}}</span>
        </div>
        <div class="order_footer" style="display:flex;justify-content:flex-end;align-items:center">
          <div class="the_goods" @click="handleGoods">确认收货</div>
        </div>
      </div>
      <!-- 支付成功 -->
    </div>
    <div class="distribution">
      <p class="order_info">订单信息</p>
      <div class="add-info_address">
        <span>订单编号</span>
        <span class="freight">{{orderDetails.orderId}}</span>
      </div>
      <div class="add-info_address">
        <span>创建时间</span>
        <span class="freight">{{orderDetails.createTime}}</span>
      </div>
    </div>
    <!-- 待支付 -->
    <div
      class="footer clearfix"
      v-if="orderDetails.status === '01'|| orderDetails.status  === '03'"
    >
      <span class="pay cancle" @click="handleCancle">取消订单</span>
      <span class="pay" @click="isShowGoodsPay = true">确认支付</span>
    </div>
    <!-- 待支付 -->
    <quit-modal
      ref="ref_modal"
      @confirm="handleConfirm"
      :title="tipsForm.title"
      showCancel="true"
      :content="tipsForm.content"
    ></quit-modal>
    <div class="like">
      <div class="like_goods">
        <img src="../../../assets/images/like.png" class="like_icon" />
        <span>猜你喜欢</span>
      </div>
      <goods></goods>
    </div>
    <div v-if="isShowGoodsPay" class="mask" catchtouchmove="ture">
      <div class="pay-box">
        <span class="iconfont iconguanbi" @click="isShowGoodsPay= false"></span>
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
        <div class="pay" @click="handleGoodsPay">确认付款</div>
      </div>
    </div>
  </article>
</template>
<script>
import { mapState } from "vuex";
import goods from "@/components/recommended/goods";
import quitModal from "@/components/basic/quitModal";
export default {
  components: {
    goods,
    quitModal
  },
  computed: {
    ...mapState({
      userInfo: "userInfo"
    })
  },
  data() {
    return {
      type: "",
      isShowGoodsPay: false,
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
      tipsForm: {
        title: "取消提示",
        content: "您确定取消订单吗"
      },
      STATICURL: STATICURL,
      orderDetails: {}
    };
  },
  //积分订单支付  积分订单展示
  mounted() {
    this.isShowGoodsPay = false;
    this.type = this.$route.query.type;
    this.radioList[0].content = this.userInfo.phone;
    this.radioList[1].content = this.userInfo.totalAmount;
    this.fetchOrderDetails();
  },
  methods: {
    handleGoodsPay() {
      let that = this;
      wx.login({
        success(res) {
          that.$store
            .dispatch("actionRequest", {
              head: {
                service: "appGroup",
                subService: "gsOrderService.pay"
              },
              code: res.code,
              orderId: that.$route.query.orderId,
              payType: that.payType
            })
            .then(res => {
              if (res.Head.state === "succ") {
                this.isShowGoodsPay = false;
                that.fetchOrderDetails();
              }
            });
        }
      });
    },
    handleGoods() {
      this.tipsForm = {
        title: "确认提示",
        content: "您确认收货吗"
      };
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: "gsOrderService.confirmReceipt"
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
      wx.showLoading();
      this.$store
        .dispatch("actionRequest", {
          queryId: "getGsOrderDetail",
          orderId: this.$route.query.orderId
        })
        .then(res => {
          this.orderDetails = res.Body.data[0];
        });
    },
    handleCancle() {
      this.tipsForm = {
        title: "取消提示",
        content: "您确定取消订单吗"
      };
      this.$refs.ref_modal.show();
    },
    handleConfirm() {
      wx.showLoading();
      if (this.tipsForm.title === "取消提示") {
        this.handleCancleOrder();
      } else {
        this.handleGoods();
      }
    },
    handleCancleOrder() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: "gsOrderService.cancel"
          },
          orderId: this.$route.query.orderId
        })
        .then(res => {
          if (res.Head.state === "succ") {
            this.fetchOrderDetails();
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-order_details {
  background: #f7f8f9;
  min-height: calc(100vh - 11px);
  padding: 11px 11px 100px 11px;
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
  .distribution {
    background: #fff;
    padding: 0 10px;
    border-radius: 10px;
    margin-top: 10px;
    .order_info {
      font-size: 18px;
      color: #989898;
      padding: 17.5px 0;
      border-bottom: 1px solid #e7e7e7;
    }
    .add-info {
      border-radius: 10px;
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
      &_address:last-child {
        border-bottom: 0;
      }
    }
    .flex-box {
      color: #999;
      span {
        margin-right: 10px;
      }
    }
    input {
      text-align: right;
      min-width: 200px;
    }
  }
  .default-address-box {
    padding: 12px;
    box-sizing: border-box;
    background: #fff;
    font-size: 15px;
    border-radius: 10px;
    .address {
      color: #909090;
    }
    .contact {
      color: #323232;
      margin-bottom: 8px;
    }
    .default-address {
      display: flex;
      margin: 10px 0;
      align-items: center;
      border-radius: 10px;
      .address-icon {
        width: 30px;
        height: 30px;
      }
      .address {
        margin-left: 12px;
        flex-grow: 1;
      }
    }
  }

  .order-list {
    margin-top: 10px;
    border-radius: 10px;
    padding: 12px;
    background: #fff;
    .order_footer {
      height: 56px;
      border-bottom: 1px solid #e7e7e7;
    }
    .the_goods {
      width: 85px;
      height: 30px;
      justify-content: center;
      display: flex;
      align-items: center;
      color: #029a71;
      border: 1px solid #029a71;
      border-radius: 50px;
    }
    .order_footer:last-child {
      border: none;
    }
    .order-item:first-child {
      margin: 0;
    }
    .order-item {
      margin-top: 20px;
      border-bottom: 1px solid #e7e7e7;
      padding-bottom: 13px;
      .order-item-pic {
        width: 100px;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        img {
          width: 100px;
          height: 100px;
        }
      }
      .order-params {
        .title {
          font-size: 16px;
          margin-bottom: 5px;
        }
        span {
          height: 25px;
          color: #999;
          display: inline-block;
        }
        .order-price {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 16px;
          .num {
            color: #999;
            font-size: 14px;
            margin-left: 5px;
          }
        }
      }
    }
    .order-note {
      font-size: 12px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        color: #999;
        text-align: right;
      }
    }
    .total {
      margin-top: 25px;
      font-size: 12px;
      text-align: right;
      span {
        color: $redColor;
      }
    }
  }
  .freight {
    color: #999;
  }
  .footer {
    background: #fff;
    position: fixed;
    bottom: 0;
    justify-content: flex-end;
    left: 0;
    align-items: center;
    z-index: 2;
    right: 0;
    display: flex;
    height: 50px;
    font-size: 16px;
    padding: 12px 0;
    .num {
      margin-left: 50px;
    }
    .total {
      margin-left: 10px;
      margin-right: 12px;
      float: right;
      span {
        color: $redColor;
      }
    }
    .pay {
      @include gradientButton;
      background: $mainColor;
      width: 142px;
      margin-right: 10px;
      margin-left: 0;
      height: 35px;
    }
    .cancle {
      background: #fff;
      border: 1px solid rgba(230, 230, 230, 1);
      color: #999;
    }
  }
  .like {
    &_goods {
      margin-top: 34.5px;
      margin-bottom: 24.5px;
      text-align: center;
    }
    &_icon {
      margin-right: 10px;
      width: 17px;
      height: 14px;
    }
  }
}
</style>
