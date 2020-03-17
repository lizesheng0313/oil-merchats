<template>
  <div>
    <div
      class="info_list"
      v-for="(item,index) in infoList"
      :key="index"
      @click="handleToContent(item)"
    >
      <img :src="item.img" mode="scaleToFill" />
      <div>
        <p class="title">{{item.articleTitle}}</p>
        <p class="describe">{{item.describe}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infoList: Array
  },
  methods: {
    handleToContent(item) {
      this.$router.push({
        path: "/pages/recommendedInfo/recommendContent/main",
        query: {
          title: item.articleTitle,
          articleId: item.articleId
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.info_list {
  border-radius: 5px;
  background: #fff;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  padding: 5px;
  img {
    width: 83px;
    height: 83px;
    margin-right: 12px;
  }
  .title {
    color: #2b2b2b;
    font-size: 16px;
  }
  .describe {
    color: #999999;
    font-size: 13px;
  }
}
</style>
