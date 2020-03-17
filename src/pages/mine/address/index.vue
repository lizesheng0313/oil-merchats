<template>
  <div class="address">
    <div>
      <div class="address_list" v-if="list.length>0">
        <div
          class="felx-box address_item"
          v-for="(item,index) in list"
          @click="handleSelectAdd(item)"
          :key="index"
        >
          <p>{{item.addr}}</p>
          <div class="flex-between flex-align_center">
            <div>
              <span>{{item.receiver}}</span>
              <span>{{item.phone}}</span>
            </div>
            <span class="iconbianji iconfont" @click="handleAdd(item)"></span>
          </div>
        </div>
      </div>
    </div>
    <div class="next" @click="handleAdd">添加地址</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queyrObj: {
        pageNum: 1
      },
      list: [],
      total: 0,
      newsInfo: {}
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
    handleSelectAdd(item) {
      if (this.$route.query.select) {
        this.$store.commit("SETCURRENTADD", {
          phone: item.phone,
          receiver: item.receiver,
          addr: item.addr
        });
        this.$router.back();
      }
    },
    reset() {
      this.list = [];
      this.queyrObj.pageNum = 1;
    },
    fetchList() {
      this.$store
        .dispatch("actionRequest", {
          queryId: "getMyAddrList",
          pageInfo: {
            pageNum: this.queyrObj.pageNum
          }
        })
        .then(res => {
          this.list = this.list.concat(res.Body.data);
          this.total = res.Body.pageInfo.totalCount;
        });
    },
    handleAdd(item, index) {
      if (item.phone) {
        this.$router.push({
          path: "/pages/mine/addressInfo/main",
          query: {
            addressInfo: JSON.stringify(item),
            add: "no"
          }
        });
      }
      this.$router.push({
        path: "/pages/mine/addressInfo/main",
        query: {
          add: "yes"
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.address {
  min-height: calc(100vh - 9px);
  background: #f7f8f9;
  padding-top: 9px;
  .address_list {
    padding: 15px;
    flex-direction: column;
    background: #fff;
    .address_item {
      padding: 10px;
      border-bottom: 1px solid #eee;
      p {
        font-size: 18px;
        color: #333;
        margin-bottom: 2px;
      }
      span {
        display: inline-block;
        margin-right: 15px;
        color: #b2b2b2;
      }
    }
    .iconbianji {
      color: #b2b2b2;
      font-size: 20px;
    }
  }

  .next {
    @include next;
  }
}
</style>
