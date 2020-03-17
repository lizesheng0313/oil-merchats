
<template>
  <div class="mask" v-if="isShow" @click="close" catchtouchmove="true">
    <div class="mut-select" @click.stop>
      <div v-if="mutTitle" class="mut-title">{{mutTitle}}</div>
      <scroll-view class="scroll-auto" scroll-y>
        <div
          v-for="(value,key) in resultObj"
          :key="key"
          class="select-item"
          @click.stop="confirmSelect(key,value)"
          :class="[{'active':currentStr==key},{'active':actionStr==value}]"
        >
          <span class="value">{{value}}</span>
        </div>
      </scroll-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      currentStr: "",
      actionStr: ""
    };
  },
  props: {
    mutObj: Object,
    mutTitle: String
  },
  computed: {
    resultObj() {
      let mutObj = { ...this.mutObj };
      delete mutObj.__newReference;
      return mutObj;
    }
  },
  onShow() {
    this.currentStr = "";
    this.isShow = false;
  },
  methods: {
    init(str) {
      this.actionStr = str;
      this.isShow = true;
    },
    close() {
      this.isShow = false;
    },
    confirmSelect(key, value) {
      this.currentStr = key;
      this.$emit("selectItem", key, value);
      this.isShow = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.mut-select {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  animation: upward 0.2s ease-out;
  padding-bottom: 10px;
  .scroll-auto {
    max-height: 200px;
    overflow-y: scroll;
  }
  .select-item {
    height: 40px;
    line-height: 40px;
    color: #333;
    display:flex;
    justify-content:center;
    font-size: 14px;
    .value {
      @include ellipsis;
      display:block;
      max-width:189px;
    }
  }
  .active {
    background: $backTips;
    color: $mainColor;
  }
  .mut-title {
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
  }
}
@keyframes upward {
  0% {
    transform: translateY(150px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>

