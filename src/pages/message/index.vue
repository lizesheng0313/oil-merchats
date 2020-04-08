<template>
  <div class="message">
    <div v-for="(item,index) in list" :key="index" class="message_list">
      <div class="flex-space_center">
        <span>赊呗申请</span>
        <span>{{item.realName}} {{item.phone}}</span>
      </div>
      <div class="flex-space_center">
        <input type="number" placeholder="请输入金额" v-model="appQuota" v-if="item.status=== '01'" />
        <span v-if="item.status=== '02'">初审已通过</span>
        <span v-if="item.status === '03'">初审未通过</span>
        <div class="button_groups">
          <span @click="handleRefused(item)">拒绝</span>
          <span @click="handleSubmit(item)">确定</span>
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
      appQuota: "",
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
    handleRefused(item) {
      let that = this;
      wx.showModal({
        title: "确认拒绝",
        content: "您是否要拒绝该请求",
        showCancel: true,
        success() {
          wx.showLoading({
            title: "拒绝中",
            mask: true
          });
          that.$store
            .dispatch("actionRequest", {
              head: {
                service: "appGroup",
                subService: "sellerService.approveCreditApply",
                appCode: "shop"
              },
              param: {
                uid: item.uid
              }
            })
            .then(res => {
              if (res.Head.state === "succ") {
                that.reset();
                that.fetchList();
              }
            });
        }
      });
    },
    handleSubmit(item) {
      let that = this;
      if (!that.appQuota) {
        wx.showToast({
          title: "请输入金额",
          icon: "none"
        });
        return;
      }
      wx.showModal({
        title: "确认同意",
        content: "您是否要同意该请求",
        showCancel: true,
        success() {
          wx.showLoading({
            title: "确定中",
            mask: true
          });
          that.$store
            .dispatch("actionRequest", {
              head: {
                service: "appGroup",
                subService: "sellerService.approveCreditApply",
                appCode: "shop"
              },
              param: {
                appQuota: that.appQuota,
                uid: item.uid
              }
            })
            .then(res => {
              if (res.Head.state === "succ") {
                that.reset();
                that.fetchList();
              }
            });
        }
      });
    },
    reset() {
      this.list = [];
      this.queyrObj.pageNum = 1;
    },
    fetchList() {
      this.$store
        .dispatch("actionRequest", {
          param: {
            queryId: "getSellerCreditList"
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
.message {
  .message_list {
    padding: 10px;
    margin: 0 10px;
    border-bottom: 1px solid #eee;
  }
  .flex-space_center:first-child {
    margin-bottom: 10px;
  }
  .button_groups {
    span {
      display: inline-block;
      width: 70px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      box-sizing: border-box;
      border-radius: 100px;
      border: 1px solid $mainColor;
      color: $mainColor;
    }
    span:first-child {
      color: #777;
      border: 1px solid #eee;
      margin-right: 10px;
    }
  }
  input {
    border: 1px solid #eee;
    border-radius: 5px;
    padding-left: 10px;
  }
}
</style>
