<template>
  <div class="add-oil">
    <map
      class="map_container"
      :longitude="longitude"
      :latitude="latitude"
      scale="18"
      :markers="markers"
    ></map>
    <div class="add-info">
      <div class="add-info_address" @click="handleGoSelectLocation">
        <div class="add-info_address-left">
          <img src="../../../static/images/icon/addoil.png" mode="widthFix" class="oil" />
          <span>{{address}}</span>
        </div>
        <img src="../../../static/images/icon/btn_next.png" class="btn_next" alt />
      </div>
      <radio-group @change="radioChange">
        <label v-for="(item,index) in radioList" :key="index">
          <input
            type="radio"
            :value="item.name"
            class="radio"
            :checked="pattern==item.name"
            color="#2D78ED"
          />
          {{item.title}}
        </label>
      </radio-group>
    </div>
    <div class="next">提交订单</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      longitude: "",
      latitude: "",
      markers: [],
      address: ""
    };
  },
  mounted() {
    let that = this;
    wx.getLocation({
      type: "gcj02",
      success(res) {
        that.latitude = that.$route.query.latitude;
        that.longitude = that.$route.query.longitude;
        that.markers = [
          {
            id: 0,
            latitude: that.latitude,
            longitude: that.longitude,
            iconPath: "/static/images/icon/personal.jpg",
            width: 20,
            height: 20,
            callout: {
              //可根据需求是否展示经纬度
              content: that.$route.query.address,
              color: "#000",
              fontSize: "14px",
              display: "CLICK"
            }
          }
        ];
      }
    });
  },
  methods: {
    handleGoSelectLocation() {
      this.$router.push({
        path: "/pages/addOil/selectLocation/main",
        query: {
          longitude: this.longitude,
          latitude: this.latitude,
          address: this.address
        }
      });
    },
    radioChange(e) {
      this.pattern = e.target.value;
    }
  }
};
</script>
<style lang="scss" scoped>
.add-oil {
  position: relative;
  map {
    width: 100%;
    height: 100vh;
  }
  .add-info {
    border-radius: 10px;
    position: fixed;
    bottom: 114px;
    color: #333;
    height: 115px;
    box-sizing: border-box;
    left: 10px;
    right: 10px;
    background: #fff;
    padding: 24px 15px;
    .oil {
      width: 20px;
      height: 20px;
    }
    &_address {
      align-items: center;
      display: flex;
      border-bottom: 1px solid #e7e7e7;
      justify-content: space-between;
      padding-bottom: 15px;
      &-left {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          margin-right: 20px;
          @include ellipsis;
          max-width: 75%;
        }
        img {
          margin-right: 11.5px;
        }
      }
    }
    .radio {
      transform: scale(0.7);
    }
    radio-group {
      margin-top: 15px;
      position: relative;
      left: -3px;
      display: flex;
      label {
        display: flex;
        align-items: center;
        margin-right: 40px;
        label:last-child {
          margin: 0;
        }
      }
    }
  }
  .next {
    @include next;
  }
}
</style>
