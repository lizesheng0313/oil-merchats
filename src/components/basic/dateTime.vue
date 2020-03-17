<template>
  <div class="animation-element-wrapper" v-if="visibility">
    <div class="animation-element">
      <div style="height: 40px">
        <div class="left-bt text" @click.stop="handleCancel">取消</div>
        <div class="right-bt text" @click.stop="handleConfirm">确定</div>
        <view class="line" />
      </div>
      <picker-view
        style="width: 100%; height: 300px;padding-top:35px"
        @change="change"
        indicator-style="height: 50rpx;"
      >
        <picker-view-column>
          <view v-for="(item, index) in time" :key="index" class="item">{{item.timeslot}}</view>
        </picker-view-column>
      </picker-view>
    </div>
  </div>
</template>
<script>
const EVENTS_CHANGE = "onChange";
const EVENTS_CONFIRM = "onConfirm";
/* eslint-disable */
export default {
  data() {
    return {
      time: [],
      value: [],
      visibility: false
    };
  },
  onLoad() {
    this.$store
      .dispatch("actionRequest", {
        queryId: "getTimeSlot"
      })
      .then(res => {
        this.time = res.Body.data;
      });
  },
  methods: {
    show() {
      this.visibility = true;
    },
    hide() {
      this.visibility = false;
    },
    handleCancel() {
      this.hide();
    },
    handleConfirm() {
      this.$emit(EVENTS_CONFIRM, this.value);
      this.hide();
    },
    change(e) {
      this.value = this.time[e.mp.detail.value[0]].timeslot;
    }
  }
};
</script>
<style lang="scss" scoped>
.animation-element-wrapper {
  display: flex;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  .animation-element {
    display: flex;
    position: fixed;
    width: 100%;
    height: 470rpx;
    bottom: 0;
    background-color: rgba(255, 255, 255, 1);
  }
  .item {
    font-size: 14px;
    line-height: 34px;
  }
  .text {
    color: #999999;
    display: inline-flex;
    position: fixed;
    margin-top: 20rpx;
    height: 50rpx;
    text-align: center;
    line-height: 50rpx;
    font-size: 34rpx;
    font-family: Arial, Helvetica, sans-serif;
    z-index: 999;
  }
  .left-bt {
    left: 30rpx;
  }
  .right-bt {
    right: 30rpx;
  }
  .line {
    display: block;
    position: fixed;
    height: 1rpx;
    width: 100%;
    margin-top: 89rpx;
    background-color: #eeeeee;
  }
  picker-view-column {
    text-align: center;
  }
}
</style>
