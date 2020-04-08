<template>
  <div class="integral-mall">
    <div class="flex-box">
      <div class="intergral_left">
        <div
          v-for="(item,index) in orderStatusList"
          :key="index"
          :class="{'active':productLine === item.productLine}"
          @click="handleCheckIndex(item,index)"
        >{{item.catgName}}</div>
      </div>
      <div class="intergral_right">
        <div class="type">
          <div
            v-for="(item,index) in type"
            :class="{active:current === index}"
            :key="index"
            @click="handleSelectcType(item,index)"
          >{{item.title}}</div>
        </div>
        <div class="intergral_right_list">
          <div
            class="intergral_right_item flex-start_center"
            v-for="(item,index) in list"
            :key="index"
          >
            <!-- <img :src="STATICURL+item.goodsImg" class="goods_pic" /> -->
            <div class="flex-box">
              <span>{{item.catgName}}</span>
              <span>{{item.price}}</span>
            </div>
            <div class="intergral_footer">
              <van-stepper :value="item.sellQty" @change="onChange(item)" />
              <div>
                <p>已销{{item.quantitySold}}笔</p>
                <p class="btn" v-if="item.isAdded === '00'" @click="handleChangeGoods(item,'01')">上架</p>
                <p class="btn" v-else @click="handleChangeGoods(item,'00')">下架</p>
              </div>
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
      STATICURL,
      num: 1,
      productLine: "",
      list: [],
      total: 0,
      orderStatusList: [],
      queyrObj: {
        pageNum: 1
      },
      current: 0,
      type: [
        {
          sort: "",
          title: "全部"
        },
        {
          sort: "01",
          title: "出售中"
        },
        {
          sort: "02",
          title: "已下架"
        }
      ]
    };
  },
  onReachBottom() {
    if (this.list.length < this.total) {
      this.queyrObj.pageNum++;
      this.fetchList();
    }
  },
  async mounted() {
    this.reset();
    await this.fetchFirstList();
    await this.fetchGoodList();
  },
  methods: {
    onChange(e) {
     this.handleChangeGoods(e,e.isAdded)
    },
    handleChangeGoods(item,value) {
      this.$store.dispatch("actionRequest", {
        head: {
          service: "appGroup",
          subService: "sellerService.modifyGoodsInfo",
          appCode: "shop"
        },
        param: {
          goodsId: item.goodsId,
          isAdded: value,
          sellQty: item.sellQty
        }
      }).then(res=>{
        if(res.Head.state == "succ") {
          item.isAdded = value
        }
      })
    },
    reset() {
      this.list = [];
      this.queyrObj.pageNum = 1;
    },
    handleSelectcType(item, index) {
      this.reset();
      this.sort = item.sort;
      this.current = index;
      this.fetchGoodList();
    },
    fetchFirstList() {
      return this.$store
        .dispatch("actionRequest", {
          param: { queryId: "getSellerGoodsCategory" }
        })
        .then(res => {
          if (res.Head.state === "succ") {
            this.orderStatusList = res.Body.data;
            this.productLine = this.orderStatusList[0].productLine;
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
            subService: "getSellerGoodsList"
          },
          param: {
            sort: this.sort,
            productLine: this.productLine
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
    handleCheckIndex(item, index) {
      this.reset();
      this.productLine = item.productLine;
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
    min-height: 100vh;
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
    .type {
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
        border-bottom: 2px solid #fff;
      }
      .active {
        border-bottom: 2px solid $mainColor;
        color: #333;
        font-weight: 500;
      }
    }
    .intergral_right_list {
      .intergral_right_item {
        position: relative;
        margin-top: 22px;
        margin-left: 16px;
        height: 100px;
        .goods_pic {
          height: 67px;
          border-radius: 100px;
          width: 67px;
          margin-bottom: 5px;
        }
        .flex_dir_center {
          justify-content: flex-end;
        }
      }
      .flex-box {
        flex-shrink: 0;
        height: 100%;
        flex-direction: column;
        margin-left: 10px;
        justify-content: space-around;
      }
    }
    .intergral_footer {
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      position: absolute;
      right: 10px;
      top: 0;
      height: 100%;
      justify-content: space-between;
      align-items: center;
      .btn {
        border-radius: 50px;
        display: inline-block;
        width: 70px;
        margin-top: 10px;
        text-align: center;
        line-height: 25px;
        height: 25px;
        border: 1px solid $mainColor;
        color: #999;
      }
    }
  }
}
</style>
