<template>
  <div class="message">
    <div>
      <div
        class="order_content"
        v-for="(item,index) in list"
        :key="index"
        @click="handleToContent(item)"
      >
        <div class="order_list">
          <div>
            <p class="title">{{item.content}}</p>
            <p class="time">配送时间：{{item.modifyTime}}</p>
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
      list: [],
      total: 0,
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
  onShow() {
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
          queryId: "getMessageList",
          phone: "",
          pageInfo: {
            pageNum: this.queyrObj.pageNum
          }
        })
        .then(res => {
          this.list = this.list.concat(res.Body.data);
          this.total = res.Body.pageInfo.totalCount;
        });
    },
    handleToContent(item) {
      this.$router.push({
        path: "/pages/mine/message/details/main",
        query: {
          orderId: item.params.orderId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.message {
  min-height: 100vh;
  background: #f7f8f9;
  padding: 10px 10px 0px 10px;
  .order_content {
    background: #fff;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 0px 17px 0 9px;
    margin-top: 10px;
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
  .order_content:first-child {
    margin: 0;
  }
}
</style>
