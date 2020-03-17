<template>
  <div class="preferential">
    <div class="flex-box header">
      <span
        class="flex"
        :class="{'active':currentNum == index}"
        v-for="(item,index) in topHeader"
        :key="index"
        @click="handleSelectStatus(item,index)"
      >
        {{item.title}}
        <i></i>
      </span>
    </div>
    <div>
      <div
        v-for="(item,index) in list"
        :key="index"
        class="list"
        @click="handleSelectPre(item)"
        :class="{'active':currentNum === 0}"
      >
        <div>
          <div class="title">
            <span class="border"></span>
            <span v-if="item.ticketType === '01'">加油券</span>
            <span v-else>商城券</span>
          </div>
          <p>{{item.ticketName}}</p>
          <p>
            <span class="time">有效期</span>
            {{item.expiryDate}}
          </p>
        </div>
        <div class="amount">
          <span>￥</span>
          {{item.faceValue}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queyrObj: {
        status: "01",
        pageNum: 1
      },
      total: 0,
      currentNum: 0,
      topHeader: [
        {
          title: "未使用",
          type: "01"
        },
        {
          title: "已使用",
          type: "02"
        }
      ],
      list: []
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
    handleSelectPre(item) {
      if (this.queyrObj.status == "01" && this.$route.query.add && item.ticketType === '01') {
        this.$store.commit("SETPROID", {
          id: item.id,
          ticketName: item.ticketName
        });
        this.$router.go(-1);
      }
    },
    reset() {
      this.list = [];
      this.queyrObj.pageNum = 1;
    },
    fetchList() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            appCode: "shop"
          },
          queryId: "getUserCoupon",
          type: "",
          catgId: "",
          brandId: "",
          status: this.queyrObj.status,
          pageInfo: {
            pageNum: this.queyrObj.pageNum
          }
        })
        .then(res => {
          this.list = this.list.concat(res.Body.data);
          this.total = res.Body.pageInfo.totalCount;
        });
    },
    handleSelectStatus(item, index) {
      this.currentNum = index;
      this.queyrObj.status = item.type;
      this.reset();
      this.fetchList();
    }
  }
};
</script>
<style lang="scss" scoped>
.preferential {
  min-height: calc(100vh - 12.5px);
  background: #f7f8f9;
  .header {
    background: #fff;
    span {
      display: flex;
      justify-content: center;
      color: #b4b4b4;
      flex-direction: column;
      font-size: 15px;
      align-items: center;
    }
    .active {
      color: #333;
      font-weight: 500;
      i {
        border-bottom: 2px solid $mainColor;
        display: inline-block;
        width: 20px;
      }
    }
  }
  .list {
    background: url("../../../assets/images/preferential.png") no-repeat;
    height: 100px;
    background-size: 100%;
    margin: 12.5px 12.5px 0 12.5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #ccc;
    padding: 0 25px;
    .title {
      color: #999;
      font-size: 17px;
      margin-bottom: 5px;
      font-weight: bold;
    }
    .border {
      display: inline-block;
      background: #999;
      height: 12.5px;
      width: 2.5px;
      margin-right: 10px;
    }
    p {
      font-size: 12px;
    }
    .amount {
      display: flex;
      align-items: flex-start;
      font-size: 36px;
      span {
        position: relative;
        top: 10px;
        font-size: 14px;
        margin-right: 5px;
      }
    }
  }
  .active {
    .title,
    .amount {
      color: #e43938;
    }
    .border {
      background: #e43938;
    }
  }
}
</style>
