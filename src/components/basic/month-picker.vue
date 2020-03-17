<template>
  <div class="mpvue-picker">
    <div :class="{'pickerMask':showPicker}" @click="maskClick" catchtouchmove="true"></div>
    <div class="mpvue-picker-content" :class="{'mpvue-picker-view-show':showPicker}">
      <div class="mpvue-picker__hd">
        <div class="mpvue-picker__action" @click="pickerCancel">取消</div>
        <div class="mpvue-picker__action" @click="pickerConfirm">确定</div>
      </div>
      <picker-view
        indicator-style="height: 40px;"
        class="mpvue-picker-view"
        :value="pickerValue"
        @change="pickerChange"
      >
        <block>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in yearList" :key="index">{{item.label}}</div>
          </picker-view-column>
          <picker-view-column>
            <div class="picker-item" v-for="(item,index) in monthList" :key="index">{{item.label}}</div>
          </picker-view-column>
        </block>
      </picker-view>
    </div>
  </div>
</template>

<script>
/* 由于 getMonth 返回 0-11（1月-12月），因此在设置的时候 month-1 */
let year = new Date().getFullYear()+1; //下标从0开始，当前年月
const MIN_DATE = new Date(1900, 0, 1); // 最小支持日期 1990-01-01
const MAX_DATE = new Date(year, 11, 31); // 最大支持日期 2099-12-31
const NOW_DATE = new Date(); // 当前日期
export default {
  data() {
    return {
      pickerValue: [], // picker-view 的 value
      showPicker: false,
      yearList: [],
      monthList: []
    };
  },
  methods: {
    initDateList(year, month) {
      let yearList = [];
      let monthList = [];
      let value = [];
      for (let i = MIN_DATE.getFullYear(); i < MAX_DATE.getFullYear(); i++) {
        if (i === year) {
          value.push(i - MIN_DATE.getFullYear());
        }
        yearList.push({ label: i + "年", value: i });
      }
      for (let i = 0; i < 12; i++) {
        if (i === month) {
          value.push(i);
        }
        monthList.push({ label: i + 1 + "月", value: i + 1 });
      }
      this.yearList = yearList;
      this.monthList = monthList;
      setTimeout(() => {
        this.pickerValue = value;
      }, 100);
    },
    pickerChange(e) {
      let value = e.mp.detail.value;
      this.pickerValue = value;
      this._$emit("onChange");
    },
    show(defaultDate) {
      setTimeout(() => {
        this.showPicker = true;
      });
      let year, month;
      // 支持传入 Date 对象
      if (
        Object.prototype.toString.call(defaultDate) === "[object Date]" &&
        !isNaN(defaultDate.getTime())
      ) {
        year = defaultDate.getFullYear();
        month = defaultDate.getMonth();
      } else {
        year = defaultDate.length > 0 ? defaultDate[0] : NOW_DATE.getFullYear();
        month =
          defaultDate.length > 0 ? defaultDate[1] - 1 : NOW_DATE.getMonth();
      }
      this.initDateList(year, month);
    },
    maskClick() {
      this.pickerCancel();
    },
    pickerCancel() {
      this.showPicker = false;
      this._$emit("onCancel");
    },
    pickerConfirm() {
      this.showPicker = false;
      this._$emit("onConfirm");
    },
    _$emit(emitName) {
      let value = this.pickerValue;
      let pickObj = {
        label: `${this.yearList[value[0]].label}${
          this.monthList[value[1]].label
        }`,
        value: `${this.yearList[value[0]].value}-${
          this.monthList[value[1]].value
        }`,
        index: value
      };
      this.$emit(emitName, pickObj);
    }
  }
};
</script>

<style>
.pickerMask {
  position: fixed;
  z-index: 1000;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
}
.mpvue-picker-content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  transition: all 0.3s ease;
  transform: translateY(100%);
  z-index: 3000;
}
.mpvue-picker-view-show {
  transform: translateY(0);
}
.mpvue-picker__hd {
  display: flex;
  padding: 9px 15px;
  background-color: #fff;
  position: relative;
  text-align: center;
  font-size: 17px;
}
.mpvue-picker__hd:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid #e5e5e5;
  color: #e5e5e5;
  transform-origin: 0 100%;
  transform: scaleY(0.5);
}
.mpvue-picker__action {
  display: block;
  flex: 1;
  color: #1aad19;
}
.mpvue-picker__action:first-child {
  text-align: left;
  color: #888;
}
.mpvue-picker__action:last-child {
  text-align: right;
}
.picker-item {
  text-align: center;
  line-height: 40px;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mpvue-picker-view {
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 238px;
  background-color: rgba(255, 255, 255, 1);
}
</style>
