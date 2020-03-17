<template>
  <div class="select-location">
    <div class="select-search">
      <div class="select-search_wapper">
        <span class="icontubiao- iconfont"></span>
        <input type="text" placeholder="搜索地点" v-model="address" />
      </div>
    </div>
    <div class="address_info">
      <scroll-view class="flex-box" scroll-x scroll-with-animation v-if="isAdd !== 'true'">
        <div
          v-for="(item,index) in addressList"
          :key="index"
          @click="selectTagsAddress(item)"
        >{{ item.tag }}</div>
      </scroll-view>
      <div class="address_list">
        <div
          v-for="(item,index) in searchAddressList"
          :key="index"
          class="search_item"
          @click="selectAddress(item)"
        >
          <div>
            <p>{{item.title}}</p>
            <span>{{item.address}}</span>
          </div>
          <img
            src="../../../../static/images/icon/sure.png"
            class="sure"
            v-if="location.content == item.address"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
var QQMapWX = require("../../../../static/js/qqmap-wx-jssdk.js");
var qqmapsdk;
export default {
  data() {
    return {
      addressList: [],
      searchAddressList: [],
      address: "",
      isAdd: ""
    };
  },
  computed: {
    ...mapState({
      location: "location"
    }),
    getAddress() {
      let that = this;
      qqmapsdk.search({
        keyword: that.address,
        location: that.location.latitude + "," + that.location.longitude,
        success: function(res) {
          that.searchAddressList = res.data;
        }
      });
      return "";
    }
  },
  onLoad() {
    qqmapsdk = new QQMapWX({
      key: "7MZBZ-DSMLF-EAHJF-N7CRC-LHQ4T-TGB5N"
    });
  },
  onShow() {
    this.isAdd = this.$route.query.add;
  },
  mounted() {
    this.$store
      .dispatch("actionRequest", {
        queryId: "getMyAddrList",
        pageInfo: {
          pageNum: 1
        }
      })
      .then(res => {
        this.addressList = res.Body.data;
      });
  },
  methods: {
    selectTagsAddress(item) {
      this.$store.commit("UPDATEDLOCATION", {
        latitude: item.lat,
        longitude: item.lnt,
        content: item.addr,
        province: item.ad_info.adcode.toString().substr(0, 2) + "0000",
        city: item.ad_info.adcode.toString().substr(0, 4) + "00",
        country: item.ad_info.adcode.toString()
      });
      this.$router.back();
    },
    selectAddress(item) {
      if (!this.$route.query.add) {
        this.$store.commit("UPDATEDLOCATION", {
          latitude: item.location.lat,
          longitude: item.location.lng,
          content: item.address,
          province: item.ad_info.adcode.toString().substr(0, 2) + "0000",
          city: item.ad_info.adcode.toString().substr(0, 4) + "00",
          country: item.ad_info.adcode.toString()
        });
      } else {
        this.$store.commit("UPDATEADDRESS", {
          lat: item.location.lat,
          lnt: item.location.lng,
          addr: item.address,
          province: item.ad_info.adcode.toString().substr(0, 2) + "0000",
          city: item.ad_info.adcode.toString().substr(0, 4) + "00",
          country: item.ad_info.adcode.toString()
        });
      }
      this.$router.back();
    }
  }
};
</script>
<style lang="scss" scoped>
.select-location {
  background: #fff;
  .select-search {
    padding: 12.5px 0;
    background: #f7f8f9;
    &_wapper {
      height: 32.5px;
      margin: 0 11px;
      background: #fff;
      border-radius: 16.5px;
      align-items: center;
      display: flex;
      .icontubiao- {
        font-size: 30px;
        margin-left: 20px;
      }
      input {
        width: 100%;
        padding-left: 20px;
      }
    }
  }
  .address_info {
    padding-top: 10px;
    background: #fff;
    scroll-view {
      white-space: nowrap;
      overflow: hidden;
      div {
        display: inline-block;
        padding: 0 20px;
        background: #f6f8f9;
        color: #333;
        margin-left: 10px;
        border-radius: 12.5px;
      }
    }
    .address_list {
      margin: 10px 10px 0 10px;
      .search_item {
        padding: 5px 0;
        border-bottom: 1px solid #eff0f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 16px;
          color: #333;
        }
        span {
          color: #999;
          font-size: 12px;
        }
      }
      .sure {
        width: 14px;
        height: 11px;
      }
    }
  }
}
</style>
