<template>
  <article class="goods-order_details">
    <div class="success">
      <img src="../../../assets/images/success.png" class="success_icon" alt />
      <span>支付成功</span>
      <p>完成时间{{orderDetails.modifyTime}}</p>
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
              {{orderDetails.price}}积分
              <span class="num">x{{orderDetails.qty}}</span>
            </p>
          </div>
        </div>
      </div>
      <div class="flex-between flex-align_center order_footer">
        <span class="freight">运费</span>
        <span>{{orderDetails.deliverAmt}}</span>
      </div>
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
    this.fetchOrderDetails();
  },
  methods: {
    fetchOrderDetails() {
      wx.showLoading();
      this.$store
        .dispatch("actionRequest", {
          queryId: "getPointsOrderDetail",
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
