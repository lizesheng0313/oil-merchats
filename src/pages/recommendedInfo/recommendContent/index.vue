<template>
  <div class="recommend-content">
    <img :src="newsInfo.img" mode="widthFix" v-if="newsInfo.img" />
    <div class="content">{{newsInfo.articleContent}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsInfo: {}
    };
  },
  onLoad() {
    let that = this;
    wx.setNavigationBarTitle({
      title: that.$route.query.title
    });
  },
  mounted() {
    this.$store
      .dispatch("actionRequest", {
        queryId: "showArticleDetail",
        articleId: this.$route.query.articleId
      })
      .then(res => {
        this.newsInfo = res.Body.data[0];
      });
  }
};
</script>
<style lang="scss" scoped>
.recommend-content {
  margin: 20px;
  img {
    display: block;
    margin: 0 auto 30px auto;
  }
  .content {
    line-height: 35px;
    font-size: 14px;
    text-indent: 2em;
  }
}
</style>
