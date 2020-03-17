<template>
  <article class="sure-order">
    <div class="default-address-box">
      <div class="default-address" @click="goMineAddress">
        <img src="../../../assets/images/address2.png" class="address-icon" alt />
        <div v-if="selectAddress.addr">
          <span class="address contact">{{selectAddress.receiver}} {{selectAddress.phone}}</span>
          <p class="address">{{selectAddress.addr}}</p>
        </div>
        <span class="address" v-else>添加收货地址</span>
        <span class="iconyoujiantou iconfont"></span>
      </div>
    </div>
    <div class="order-list">
      <div class="flex-box order-item">
        <div class="order-item-pic">
          <img :src="STATICURL+goodsInfo.goodsImg" class="goods-pic" alt mode="widthFix" />
        </div>
        <div class="order-params">
          <p class="title">{{goodsInfo.goodsName}}</p>
          <span>{{goodsInfo.brandName}}</span>
          <div class="order-price">
            <p class="price">
              ￥{{goodsInfo.price}}
              <span v-if="productLine">积分</span>
            </p>
            <div class="flex-box flex-all-center">
              <span class="symbol" @click="handleReduction">-</span>
              <input type="text" v-model="queryObj.qty" @input="handleInpnt" />
              <span class="symbol" @click="handleAdd">+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="distribution">
      <div class="add-info_address" v-if="!productLine">
        <div class="add-info_address-left">
          <span>配送方式</span>
        </div>
        <div class="flex-box">
          <span>快递￥{{goodsInfo.expressFee}}</span>
        </div>
      </div>
      <div class="add-info_address" @click="handleGoSelectPreferential" v-if="!productLine">
        <div class="add-info_address-left">
          <span>优惠卷</span>
        </div>
        <div class="flex-box">
          <span>{{preferentialObj.ticketName}}</span>
          <i class="iconyou iconfont"></i>
        </div>
      </div>
      <div class="add-info_address">
        <div class="add-info_address-left">
          <span>买家留言</span>
        </div>
        <input type="text" v-model="queryObj.note" placeholder="选填：对本次交易的说明" />
      </div>
    </div>
    <div class="footer clearfix">
      <p class="num">共2件</p>
      <p class="total">
        合计:
        <span>
          ￥{{queryObj.qty * goodsInfo.price}}
          <span v-if="productLine">积分</span>
        </span>
      </p>
      <span class="pay" @click="handleSubmitOrder">提交订单</span>
    </div>
    <div v-if="isShowIntegralPay" class="mask" catchtouchmove="ture">
      <div class="pay-box">
        <span class="iconfont iconguanbi" @click="isShowIntegralPay= false"></span>
        <p class="title">付款详情</p>
        <p class="order_price">
          <span>需付款:</span>
          <span>{{ queryObj.qty * goodsInfo.price}}分</span>
        </p>
        <div class="pay" @click="handleInteralPay">确认付款</div>
      </div>
    </div>
  </article>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      selectAddress: "selectAddress",
      preferentialObj: "preferentialObj"
    })
  },
  data() {
    return {
      isShowIntegralPay: false,
      productLine: "",
      queryObj: {
        note: "",
        qty: 1
      },
      STATICURL: STATICURL,
      goodsInfo: {}
    };
  },
  mounted() {
    this.isShowIntegralPay = false;
    this.productLine = this.$route.query.productLine;
    this.$store.commit("SETPROID", {
      id: "",
      ticketName: "请选择优惠卷"
    });
    this.$store.commit("SETCURRENTADD", {
      phone: "",
      receiver: "",
      addr: ""
    });
    this.goodsInfo = JSON.parse(
      decodeURIComponent(this.$route.query.goodsInfo)
    );
  },
  onUnload() {
    this.productLine = "";
  },
  methods: {
    handleGoSelectPreferential() {
      this.$router.push({
        path: "/pages/mine/preferential/main",
        query: { add: "true" }
      });
    },
    handleInteralPay() {
      wx.showLoading({
        title: "提交中",
        mask: true
      });
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: "gsOrderService.add"
          },
          address: {
            phone: this.selectAddress.phone,
            receiver: this.selectAddress.receiver,
            addr: this.selectAddress.addr
          },
          goodsList: [
            {
              goodsId: this.goodsInfo.goodsId,
              qty: this.queryObj.qty
            }
          ],
          note: this.queryObj.note
        })
        .then(res => {
          if (res.Head.state === "succ") {
            wx.showToast({
              title: "付款成功"
            });
            setTimeout(() => {
              this.$router.push({
                path: "/pages/order/main",
                isTab: true
              });
            }, 1500);
          }
        });
    },
    handleSubmitOrder() {
      if (!this.selectAddress.addr) {
        wx.showToast({
          title: "请选择地址",
          icon: "none"
        });
        return;
      }

      if (this.productLine) {
        this.isShowIntegralPay = true;
      } else {
        wx.showLoading({
          title: "提交中",
          mask: true
        });
        this.$store
          .dispatch("actionRequest", {
            head: {
              service: "appGroup",
              subService: "gsOrderService.add"
            },
            address: {
              phone: this.selectAddress.phone,
              receiver: this.selectAddress.receiver,
              addr: this.selectAddress.addr
            },
            goodsList: [
              {
                goodsId: this.goodsInfo.goodsId,
                qty: this.queryObj.qty
              }
            ],
            couponId: this.preferentialObj.id,
            note: this.queryObj.note
          })
          .then(res => {
            if (res.Head.state === "succ") {
              wx.showToast({
                title: "下单成功"
              });
              setTimeout(() => {
                this.$router.push({
                  path: "/pages/order/main",
                  isTab: true
                });
              }, 1500);
            }
          });
      }
    },
    goMineAddress() {
      this.$router.push({
        path: "/pages/mine/address/main",
        query: {
          select: "yes"
        }
      });
    },
    handleReduction() {
      if (this.queryObj.qty > 1) {
        this.queryObj.qty--;
      }
    },
    handleAdd() {
      if (this.queryObj.qty < 30) {
        this.queryObj.qty++;
      }
    },
    handleInpnt() {
      if (this.queryObj.qty > 30) {
        this.queryObj.qty = 30;
      } else if (this.queryObj.qty < 0) {
        this.queryObj.qty = 1;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.sure-order {
  background: #f7f8f9;
  min-height: calc(100vh - 11px);
  padding: 11px 11px 100px 11px;
  .distribution {
    background: #fff;
    padding: 0 10px;
    border-radius: 10px;
    margin-top: 10px;
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

    .order-item {
      border-bottom: 1px solid #e7e7e7;
      margin-bottom: 20px;
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
        width: 100%;
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
            font-size: 12px;
            margin-left: 5px;
          }
        }
        input {
          width: 30px;
          text-align: center;
          margin: 0 5px;
        }
        .symbol {
          border: 1px solid #ccc;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 15px;
          font-size: 18px;
          height: 15px;
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
  .footer {
    background: #fff;
    position: fixed;
    z-index: 2;
    bottom: 0;
    justify-content: space-around;
    left: 0;
    align-items: center;
    right: 0;
    display: flex;
    height: 50px;
    font-size: 16px;
    padding: 12px 0;
    .num {
      margin-left: 20px;
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
      margin: 0;
      width: 142px;
      height: 35px;
    }
  }
}
</style>
