<template>
  <div class="order">
    <div class="flex-box status">
      <div
        v-for="(item,index) in orderStatusList"
        :class="{'active':currentNum == index}"
        :key="index"
        @click="handleSelectStatus(item,index)"
      >{{ item.title }}</div>
    </div>
    <div>
      <div
        class="order_content"
        v-for="(item,index) in orderList"
        :key="index"
        @click="handleToContent(item)"
      >
        <div class="order_list">
          <img :src="STATICURL+item.goodsImg" mode="scaleToFill" />
          <div style="width:100%">
            <p class="title">{{item.goodsTitle}}</p>
            <p class="describe">{{item.goodsDesc}}</p>
            <div class="flex-between flex-align_center">
              <div class="price flex-box">
                <p>￥399</p>
                <span class="f12">{{item.sellTypeStr}}</span>
              </div>
              <div class="f12">已销{{item.quantitySold}}笔</div>
            </div>
          </div>
        </div>
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
      orderList: [],
      currentNum: 0,
      orderStatusList: [
        { type: "up", title: "综合" },
        { type: "down", title: "销量优先" },
        { type: "down", title: "有货优先" },
        { type: "down", title: "价格排序" }
      ]
    };
  },
  mounted() {
    this.fetchGoodsList();
  },
  methods: {
    fetchGoodsList() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            subService: "getGoodsPageList"
          },
          productLine: "all",
          full: this.orderStatusList[0].type,
          quantitySold: this.orderStatusList[1].type,
          price: this.orderStatusList[2].type,
          sellQty: this.orderStatusList[3].type
        })
        .then(res => {
          this.orderList = res.Body.data;
        });
    },
    handleSelectStatus(item, index) {
      this.currentNum = index;
      this.orderStatusList.forEach(element => {
        element.type = "down";
      });
      this.orderStatusList[index].type = "up";
      this.fetchGoodsList();
    },
    handleToContent(item) {
      this.$router.push({
        path: "/pages/goodsDetails/main",
        query: {
          goodsId: item.goodsId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.order {
  min-height: 100vh;
  background: #f7f8f9;
  padding: 0 10px;
  .status {
    display: flex;
    padding-top: 5px;
    justify-content: space-around;
    background: #fff;
    margin: 0 -10px 15px -10px;
    div {
      display: inline-block;
      color: #b4b4b4;
      font-size: 15px;
    }
    .active {
      border-bottom: 2px solid $mainColor;
      color: #333;
      font-weight: 500;
    }
  }
  .order_content {
    background: #fff;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 5px 17px 0px 9px;
    .order_list {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      border-top: 1px solid #eee;
      padding-bottom: 11px;
      padding-top: 10px;
      color: #999;
      font-size: 13px;
      .title {
        color: #2b2b2b;
        font-size: 16px;
      }
      img {
        width: 100px;
        flex-shrink: 0;
        height: 100px;
        margin-right: 15px;
      }
      .describe {
        margin: 1px 0;
        font-size: 13px;
        min-height: 30px;
      }
    }
    .price {
      color: $redColor;
      font-size: 18px;
      align-items: center;
      span {
        margin-left: 6px;
        font-size: 12px;
      }
    }
  }
  .f12 {
    color: #999;
    font-size: 12px;
    margin-top: 4px;
  }
}
</style>
