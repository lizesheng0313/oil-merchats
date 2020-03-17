<template>
  <div class="good">
    <div
      v-for="(item,index) in homeGoods"
      :key="index"
      class="good_list"
      @click="handleGoGoodsDetsils(item)"
    >
      <img :src="STATICURL+item.goodsImg" mode="widthFix" />
      <p class="info">{{item.goodsTitle}}</p>
      <p class="content">
        <span class="price">￥{{item.price}}</span>
        <span class="sales">月销{{item.quantitySold}}笔</span>
      </p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    flag: {
      default: false
    }
  },
  data() {
    return {
      STATICURL: STATICURL,
      homeGoods: []
    };
  },
  mounted() {
    this.$store
      .dispatch("actionRequest", {
        head: {
          subService: "getGoodsPageList"
        },
        tag: 1,
        productLine: "all"
      })
      .then(res => {
        this.homeGoods = res.Body.data;
      });
  },
  methods: {
    handleGoGoodsDetsils(item) {
      if (this.flag) {
        this.$router.push({
          path: "/pages/goodsDetails/main",
          query: {
            goodsId: item.goodsId
          }
        });
      } else {
        this.$router.replace({
          path: "/pages/goodsDetails/main",
          query: {
            goodsId: item.goodsId
          }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.good {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .good_list {
    border-radius: 5px;
    margin-bottom: 10px;
    flex-basis: 48.8%;
    background: #fff;

    img {
      width: 100%;
      height: 125px;
    }

    .info {
      margin-top: 10px;
      color: #303030;
      font-size: 13px;
      padding: 0 10px;
      text-align: justify;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 40px;
    }

    .content {
      padding: 0 10px;
      margin-top: 10px;
      @include flexBetweenCenter;
      .price {
        font-size: 16px;
      }

      .sales {
        color: #969798;
        font-size: 12px;
      }
    }
  }
}
</style>
