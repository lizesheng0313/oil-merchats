<template>
  <div class="star">
    <image class="no-star" :src="noStarUrl" @tap="addStar(1)" v-if="activeNum<1" />
    <image class="star" :src="starUrl" v-if="activeNum>0 && activeNum<=5" @tap="addStar(1)" />
    <image class="no-star" :src="noStarUrl" @tap="addStar(2)" v-if="activeNum<2" />
    <image class="star" :src="starUrl" v-if="activeNum>1 && activeNum<=5" @tap="addStar(2)" />
    <image class="no-star" :src="noStarUrl" @tap="addStar(3)" v-if="activeNum<3" />
    <image class="star" :src="starUrl" v-if="activeNum>2 && activeNum<=5" @tap="addStar(3)" />
    <image class="no-star" :src="noStarUrl" @tap="addStar(4)" v-if="activeNum<4" />
    <image class="star" :src="starUrl" v-if="activeNum>3 && activeNum<=5" @tap="addStar(4)" />
    <image class="no-star" :src="noStarUrl" @tap="addStar(5)" v-if="activeNum<5" />
    <image class="star" :src="starUrl" v-if="activeNum===5" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNum: 0,
      noStarUrl: require("../../../assets/images/star.png"),
      starUrl: require("../../../assets/images/starActive.png")
    };
  },
  methods: {
    addStar(num) {
      let that = this;
      that.activeNum = num;
    }
  }
};
</script>
<style lang="scss" scoped>
.star {
  image {
    display: inline-block;
    width: 22.5px;
    height: 22.5px;
    margin-right: 15px;
  }
}
</style>
