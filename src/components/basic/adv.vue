<template>
  <div class="adv" :class="{'m0':isNotMargin,'no_margin':noMargin}">
    <img src="http://pic.youbenben.net/static/image/banner/guanggao@2x.png" mode="widthFix" />
  </div>
</template>
<script>
export default {
  props: {
    isNotMargin: Boolean,
    noMargin: Boolean
  }
};
</script>
<style lang="scss" scoped>
.adv {
  margin: 12.5px 10px 25px 10px;
  height: 90px;
  img {
    width: 100%;
    height: 90px;
  }
}
.m0 {
  margin: 0 10px;
}
.no_margin{
  margin:0;
}
</style>
