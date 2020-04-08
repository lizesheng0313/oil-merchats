<template>
  <div class="bill_manage">
    <!-- <swiper :autoplay="true" :interval="5000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,index) in bannerList" :key="index">
        <img class="slide-image" mode="widthFix" :src="item.imgPath" />
      </swiper-item>
    </swiper> -->
    <div class="mine-info">
      <div>
        <span>{{merchantInfo.todayIncome}}</span>
        <p>今日流水</p>
      </div>
      <div>
        <span>{{merchantInfo.yesterdayIncome}}</span>
        <p>昨日流水</p>
      </div>
      <div>
        <span>{{merchantInfo.incomeAmount}}</span>
        <p>账单总额</p>
      </div>
    </div>
    <div class="content">
      <div class="flex-between" v-for="(item,index) in list" :key="index">
        <span>{{item.sceneStr}}</span>
        <p>{{item.amount}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      bannerList: [],
      list: [],
      queyrObj: {
        pageNum: 1
      }
    };
  },
  computed: {
    ...mapState({
      merchantInfo: "merchantInfo"
    })
  },
  onReachBottom() {
    if (this.list.length < this.total) {
      this.queyrObj.pageNum++;
      this.fetchList();
    }
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
          param: {
            queryId: "getSellerAccountTrade"
          },
          pageInfo: {
            pageNum: this.queyrObj.pageNum
          }
        })
        .then(res => {
          this.list = this.list.concat(res.Body.data);
          this.total = res.Body.pageInfo.totalCount;
        });
    }
  }
};
</script>
<style lang="scss" scoped >
.bill_manage {
  swiper {
    height: 130px;
    margin: 0 10px;
    img {
      width: 100%;
      height: 120px !important;
      border-radius: 10px;
    }
  }
  min-height: calc(100vh - 12.5px);
  padding-top: 9px;
  background: #f7f8f9;
  .adv {
    margin-top: 0;
  }
  .mine-info {
    height: 69.5px;
    margin: 12.5px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: space-around;
    box-sizing: border-box;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-right: 1px solid #efefef;
      padding-right: 33px;
      span {
        color: $mainColor;
        font-size: 21px;
      }
      p {
        color: #666;
        font-size: 14px;
      }
    }
    div:last-child {
      border: none;
      padding: 0;
    }
  }
  .content {
    background: #fff;
    margin: 18px 9px 0 9px;
    color: #b2b2b2;
    border-radius: 10px;
    span {
      color: #323232;
    }
    .flex-between {
      padding: 18px 10px 18px 18px;
      align-items: center;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
