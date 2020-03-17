<template>
  <div class="view-picture">
    <div class="contract-picture" v-for="(item,index) in pictureUrl" :key="index">
      <img :src="item" @click="viewPicture(item)" class="pic">
      <div v-for="(item,ind) in templateContentItems" :key="ind">
        <img
          v-if="item.paramValue.belong == index+1"
          mode="widthFix"
          :src="item.paramValue.currentSign"
          class="current-sign"
          :style="{top:item.paramValue.signTop+'rpx',left:item.paramValue.signLeft+'rpx'}"
        >
      </div>
    </div>
  </div>
</template>
<script>
import * as U from "../pages/sign/store/actionTypes";
export default {
  props: {
    pictureUrl: {
      type: Array,
      default: []
    },
    templateContentItems: Array
  },
  mounted() {
    setTimeout(() => {
      var query = wx.createSelectorQuery();
      query.select(".contract-picture").boundingClientRect();
      query.exec(res => {
        this.$store.commit("signPageStore/" + U.PICHEIGHT, res[0].height);
      });
    }, 100);
  },
  methods: {
    viewPicture(url) {
      let that = this;
      wx.previewImage({
        current: url,
        urls: that.pictureUrl
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.view-picture {
  .contract-picture {
    position: relative;
    border-bottom: 1px solid #eee;
    .pic {
      width: 345px;
      height: 500px;
      display: block;
      margin: 0 auto;
    }
    .current-sign {
      position: absolute;
      width: 50px;
    }
  }
}
.document-sign {
  .contract-picture {
    border: none;
  }
}
</style>
