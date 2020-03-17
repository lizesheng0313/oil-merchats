<template>
  <div class="recommendedInfo">
    <info-list :infoList="homeInfoList"></info-list>
  </div>
</template>
<script>
import infoList from "@/components/list/infoList";
export default {
  components: {
    infoList
  },
  data() {
    return {
      homeInfoList: []
    };
  },
  mounted() {
    this.$store
      .dispatch("actionRequest", {
        queryId: "getArticleTop",
        columnCode: "shopTop"
      })
      .then(res => {
        this.homeInfoList = res.Body.data;
      });
  }
};
</script>
<style lang="scss" scoped>
.recommendedInfo {
  padding-top: 5px;
  background: #f7f8f9;
  min-height: calc(100vh - 5px);
}
</style>
