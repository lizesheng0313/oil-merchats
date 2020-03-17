<template>
  <div class="integral-mall_list">
    <div
      class="order_content"
      v-for="(item,index) in list"
      :key="index"
      @click="handleToContent(item)"
    >
      <div class="order_list">
        <img :src="STATICURL+item.goodsImg" mode="scaleToFill" />
        <div>
          <p class="title">{{item.goodsName}}</p>
          <p class="time">{{item.goodsDesc}}</p>
        </div>
      </div>
      <div class="flex-box order_footer">
        <span class="amount">{{item.price}}积分</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      STATICURL: STATICURL,
      list: [],
      currentNum: 0,
      queyrObj: {
        pageNum: 1
      },
      total: 0
    };
  },
  onReachBottom() {
    if (this.list.length < this.total) {
      this.queyrObj.pageNum++;
      this.fetchList();
    }
  },
  onLoad() {
    let that = this;
    wx.setNavigationBarTitle({
      title: that.$route.query.title
    });
  },
  mounted() {
    this.reset();
    this.fetchList();
  },
  methods: {
    reset() {
      this.list = [];
      this.queyrObj.pageNum = 1;
    },
    fetchList() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            subService: "getPointsGoodsList"
          },
          productLine: this.$route.query.productLine,
          brandId: this.$route.query.brandId,
          sort: "default",
          pageInfo: {
            pageNum: this.queyrObj.pageNum
          }
        })
        .then(res => {
          if (res.Head.state === "succ") {
            this.list = this.list.concat(res.Body.data);
            this.total = res.Body.pageInfo.totalCount;
          }
        });
    },
    handleToContent(item) {
      this.$router.push({
        path: "/pages/goodsDetails/main",
        query: {
          productLine: this.$route.query.productLine,
          goodsId: item.goodsId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-mall_list {
  min-height: 100vh;
  background: #f7f8f9;
  padding: 0 10px;
  .order_content {
    background: #fff;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 5px 17px 0px 9px;
    .order_no {
      justify-content: space-between;
      padding: 10px 0;
      color: #303030;
      display: flex;
      .type {
        color: #1950d9;
      }
    }
    .order_list {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      padding-bottom: 11px;
      padding-top: 10px;
      color: #999;
      font-size: 13px;
      img {
        width: 110px;
        height: 83px;
        flex-shrink: 0;
        margin-right: 15px;
      }
      .title {
        color: #2b2b2b;
        font-size: 16px;
      }
      .describe {
        color: #999999;
        font-size: 13px;
      }
    }
    .order_footer {
      padding: 8px;
      align-items: center;
      color: #303030;
      font-size: 13px;
      .amount {
        font-size: 16px;
        margin-left: 5px;
      }
    }
  }
}
</style>
