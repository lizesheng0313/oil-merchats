<template>
  <div class="message">
    <div v-for="(item,index) in list" :key="index" class="message_list">
      <div class="flex-space_center">
        <span>申请</span>
        <span>123</span>
      </div>
      <div class="flex-space_center">
        <span>{{item.title}}</span>
        <span>233</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      list: [, ,],
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
      // this.list = [];
      this.queyrObj.pageNum = 1;
    },
    fetchList() {
      this.$store
        .dispatch("actionRequest", {
          param: {
            queryId: "getSellerMsgList"
          },
          pageInfo: {
            pageNum: this.queyrObj.pageNum
          }
        })
        .then(res => {
          // this.list = this.list.concat(res.Body.data);
          // this.total = res.Body.pageInfo.totalCount;
        });
    }
  }
};
</script>
<style lang="scss" scoped >
.message {
  .message_list {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
}
</style>
