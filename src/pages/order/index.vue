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
        v-for="(item,index) in list"
        :key="index"
        @click="handleToContent(item)"
      >
        <div class="order_no">
          <span>订单号：{{item.orderId}}</span>
          <span class="type">{{item.statusStr}}</span>
        </div>
        <div class="order_list">
          <img :src="STATICURL+item.goodsImg" mode="scaleToFill" />
          <div>
            <!-- <div v-if="item.type === 'diesel'">
              <p class="time">司机姓名：{{item.name}}</p>
              <p>车牌号：{{item.plateNo}}</p>
              <p class="time">预约时间：{{item.timeSlot}}</p>
            </div>-->
            <div>
              <p class="title">{{item.goodsName}}</p>
            </div>
            <p class="time">创建时间：{{item.createTime}}</p>
            <p>单价：{{item.price}}</p>
          </div>
        </div>
        <div
          class="flex-box order_footer"
          v-if="item.status === '08'"
          style="display:flex;justify-content:flex-end"
        >
          <div @click="handleToSubmit(item)" class="btn_goods">确认收货</div>
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
      list: [],
      currentNum: 0,
      queyrObj: {
        status: "",
        pageNum: 1
      },
      total: 0,
      orderStatusList: [
        { type: "", title: "全部" },
        { type: "1", title: "配送中" },
        { type: "2", title: "待支付" },
        { type: "3", title: "待评价" },
        { type: "4", title: "已完成" }
      ]
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
  mounted() {
    this.reset();
    this.fetchList();
  },
  methods: {
    handleToSubmit(item) {
      let t = this;
      wx.showModal({
        title: "确认提示",
        content: "是否确认提供",
        showCancel: true,
        success() {
          wx.showLoading({
            title: "确认中",
            mask: true
          });
          t.$store
            .dispatch("actionRequest", {
              head: {
                service: "appGroup",
                subService: "gsOrderService.confirmSend"
              },
              param: {
                orderId: item.orderId
              }
            })
            .then(res => {
              if (res.Head.state === "succ") {
                this.reset();
                this.fetchList();
              }
            });
        }
      });
    },
    fetchList() {
      this.$store
        .dispatch("actionRequest", {
          param: {
            queryId: "getSellerOrderList",
            sort: this.queyrObj.status
          },
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
    handleSelectStatus(item, index) {
      this.currentNum = index;
      this.queyrObj.status = item.type;
      this.reset();
      this.fetchList();
    },
    reset() {
      this.list = [];
      this.queyrObj.pageNum = 1;
    },
    handleToContent(item) {
      if (item.type === "goods") {
        this.$router.push({
          path: "/pages/goodsDetails/goodsOrderDetails/main",
          query: {
            orderId: item.orderId
          }
        });
      } else if (item.type === "point") {
        this.$router.push({
          path: "/pages/integralMall/intergralOrderDetails/main",
          query: {
            orderId: item.orderId
          }
        });
      } else {
        this.$router.push({
          path: "/pages/order/orderDetails/main",
          query: {
            orderId: item.orderId
          }
        });
      }
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
    padding-top: 10px;
    display: flex;
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
  .btn_goods {
    width: 90px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    color: #777;
    border: 1px solid #ccc;
  }
}
</style>
