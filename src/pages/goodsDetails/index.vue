<template>
  <div class="goods-details">
    <img :src="STATICURL+goodsInfo.goodsImg" class="goods_pic" />
    <div class="goods_wapper">
      <div class="goods_warp">
        <div class="flex-box goods_price">
          <div class="flex-box flex-align_center">
            <span class="price flex-box flex-align_center">
              <i>￥</i>
              {{goodsInfo.price}}
              <span v-if="productLine"></span>
            </span>
            <span class="origin_price">{{goodsInfo.marketPrice}}</span>
          </div>
          <!-- <img src="../../assets/images/share.png" alt class="share" /> -->
        </div>
        <div class="goods_details">
          <h1>{{goodsInfo.goodsName}}</h1>
          <p class="goods_related">
            <span>快递：{{goodsInfo.expressFee}}</span>
            <span>已销：{{goodsInfo.quantitySold}}</span>
          </p>
        </div>
        <div v-html="goodsInfo.details" class="details"></div>
      </div>
      <adv></adv>
      <div class="goods_footer">
        <div class="home_goods">
          <p class="recommended_header">
            <span class="title">推荐商品</span>
          </p>
          <goods></goods>
        </div>
      </div>
      <div class="goods_order">
        <button class="flex-box flex-align_center" open-type="contact" hover-class="none">
          <img src="../../assets/images/customer.png" alt />
          <span>客服</span>
        </button>
        <span class="buy" @click="handleGoSureOder" v-if="productLine">兑换商品</span>
        <span class="buy" @click="handleGoSureOder" v-else>立即购买</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import goods from "@/components/recommended/goods";
import adv from "@/components/basic/adv";
export default {
  components: {
    adv,
    goods
  },
  data() {
    return {
      productLine: "",
      STATICURL: STATICURL,
      goodsId: "",
      goodsInfo: []
    };
  },
  mounted() {
    this.goodsId = this.$route.query.goodsId;
    this.productLine = this.$route.query.productLine;
    this.fetchGoods();
  },
  onUnload() {
    this.productLine = "";
  },
  methods: {
    fetchGoods() {
      if (this.productLine) {
        this.$store
          .dispatch("actionRequest", {
            head: {
              subService: "getPointsGoodsDetail"
            },
            goodsId: this.goodsId,
            productLine: this.productLine
          })
          .then(res => {
            this.goodsInfo = res.Body.data[0];
          });
      } else {
        this.$store
          .dispatch("actionRequest", {
            head: {
              subService: "getGoodsDetail"
            },
            goodsId: this.goodsId
          })
          .then(res => {
            this.goodsInfo = res.Body.data[0];
          });
      }
    },
    handleGoSureOder() {
      this.$router.push({
        path: "/pages/goodsDetails/sureOrder/main",
        query: {
          productLine: this.productLine,
          goodsInfo: encodeURIComponent(JSON.stringify(this.goodsInfo))
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.goods-details {
  background: #f7f8f9;
  padding-bottom: 80px;
  .goods_order {
    padding: 0 30px;
    position: fixed;
    left: 0;
    bottom: 0;
    right: 0;
    height: 70px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: 25px;
      height: 23px;
      margin-right: 4px;
    }
    .buy {
      width: 120px;
      border-radius: 50px;
      height: 38px;
      background: $mainColor;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 15px;
    }
  }
  .goods_pic {
    width: 100%;
    height: 310px;
  }
  .goods_warp {
    padding: 12px 12px;
    background: #fff;
  }
  .goods_wapper {
    .goods_price {
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      i {
        font-size: 18px;
      }
      .price {
        color: $redColor;
      }
      .origin_price {
        margin-top: 2px;
        font-size: 15px;
        color: #ccc;
        margin-left: 20px;
      }
      .share {
        width: 36px;
        height: 36px;
      }
    }
    .goods_details {
      margin-bottom: 20px;
      h1 {
        font-size: 18px;
        margin-bottom: 13px;
        color: #2b2b2b;
      }
      .goods_related {
        font-size: 13px;
        color: #6d6d6d;
        span:first-child {
          margin-right: 30px;
        }
      }
    }
  }
  .goods_footer {
    margin: 0 12px;
  }
  .details {
    font-size: 14px;
    line-height: 35px;
  }
}
</style>
