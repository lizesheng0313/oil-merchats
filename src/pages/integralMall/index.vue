<template>
  <div class="integral-mall">
    <div class="adv">
      <adv :noMargin="true"></adv>
    </div>
    <div class="flex-box">
      <div class="intergral_left">
        <div
          v-for="(item,index) in orderStatusList"
          :key="index"
          :class="{'active':productLine == item.productLine}"
          @click="handleCheckIndex(item,index)"
        >{{item.value}}</div>
      </div>
      <div class="intergral_right">
        <div class="goods">
          <i></i>
          <span>{{currentTitle}}</span>
          <i></i>
        </div>
        <div class="intergral_right_list">
          <div
            class="intergral_right_item"
            v-for="(item,index) in goodsList"
            :key="index"
            @click="handleGoList(item)"
          >
            <img :src="item.img" mode="widthFix" class="goods_pic" />
            <span>{{item.catgName}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import adv from "@/components/basic/adv";
export default {
  components: { adv },
  data() {
    return {
      productLine: "",
      currentTitle: "",
      goodsList: [],
      orderStatusList: []
    };
  },
  async mounted() {
    this.productLine = this.$route.query.productLine;
    this.currentTitle = this.$route.query.currentTitle;
    await this.fetchFirstList();
    await this.fetchGoodList();
  },
  methods: {
    fetchFirstList() {
      return this.$store
        .dispatch("actionRequest", {
          head: {
            subService: "getMallHomePageMenu"
          },
          queryId: "getPointsMallMenu"
        })
        .then(res => {
          if (res.Head.state === "succ") {
            if (!this.productLine) {
              this.productLine = res.Body.data[0].productLine;
              this.currentTitle = res.Body.data[0].value;
            }
            this.orderStatusList = res.Body.data;
          }
        });
    },
    fetchGoodList() {
      wx.showLoading({
        title: "加载中",
        mask: true
      });
      return this.$store
        .dispatch("actionRequest", {
          head: {
            subService: "getPointsCategory"
          },
          level: "1",
          productLine: this.productLine
        })
        .then(res => {
          if (res.Head.state === "succ") {
            this.goodsList = res.Body.data;
          }
        });
    },
    handleGoList(item) {
      this.$router.push({
        path: "/pages/integralMall/integralMallList/main",
        query: {
          title: this.currentTitle,
          productLine: this.productLine,
          brandId: item.id
        }
      });
    },
    handleCheckIndex(item, index) {
      this.productLine = item.productLine;
      this.currentTitle = item.value;
      this.fetchGoodList();
    },
    handleToContent(item) {
      this.$router.push({
        path: "/pages/goodsDetails/main"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.integral-mall {
  background: #f7f8f9;
  min-height: calc(100vh - 10px);
  .adv {
    padding: 10px;
  }
  .intergral_left {
    width: 101px;
    div {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 3px solid #f7f8f9;
    }
    .active {
      background: #fff;
      border-left: 3px solid #4f7ced;
    }
  }
  .intergral_right {
    background: #fff;
    min-height: calc(100vh - 110px);
    flex: 1;
    padding-top: 10px;
    .goods {
      display: flex;
      align-items: center;
      justify-content: center;
      i {
        display: inline-block;
        width: 20px;
        height: 1px;
        background: #323232;
      }
      span {
        margin: 0 30px;
      }
    }
    .intergral_right_list {
      .intergral_right_item {
        margin-top: 22px;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        margin-left: 16px;
        .goods_pic {
          height: 67px;
          width: 67px;
          margin-bottom: 5px;
        }
      }
    }
  }
}
</style>
