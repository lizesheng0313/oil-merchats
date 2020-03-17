<template>
  <div class="capital">
    <adv :isNotMargin="true"></adv>
    <div class="mine-info">
      <div>
        <span>{{userInfo.availableAmount}}</span>
        <p>加油余额</p>
      </div>
      <div>
        <span>{{userInfo.mallAmount}}</span>
        <p>购物余额</p>
      </div>
      <div>
        <span>{{userInfo.creditAmount}}</span>
        <p>赊呗余额</p>
      </div>
    </div>
    <div class="content">
      <div class="flex-between" v-for="(item,index) in list" :key="index">
        <span>{{item.desc}}</span>
        <p>{{item.amount}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import adv from "@/components/basic/adv";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userInfo: "userInfo"
    })
  },
  components: {
    adv
  },
  data() {
    return {
      list: [],
      queyrObj: {
        pageNum: 1
      }
    };
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
          queryId: "getAccountTrade",
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
.capital {
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
