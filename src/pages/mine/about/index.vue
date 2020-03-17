<template>
  <div class="about">
    <img :src="newsInfo.img" mode="widthFix" v-if="newsInfo.img" />
    <div class="content" v-html="newsInfo.articleContent"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newsInfo: {}
    };
  },
  mounted() {
    this.$store
      .dispatch("actionRequest", {
        queryId: "showArticleDetail",
        articleId: "1"
      })
      .then(res => {
        this.newsInfo = res.Body.data[0];
      });
  }
};
</script>
<style lang="scss" scoped>
.about {
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
