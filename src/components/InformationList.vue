<template>
  <div class="information-list">
    <div v-for="(item,index) in infoList" :key="index" class="information-list__box">
      <strong>{{item.title}}</strong>
      <p>{{item.value}}</p>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    infoList: Array
  }
};
</script>
<style lang="scss" scoped>
.information-list {
  .information-list__box {
    border-bottom: 1px solid #eee;
    padding:15px 0;
    strong {
      color: #333;
      font-weight: 500;
      font-size: 16px;
    }
    p {
      font-size: 13px;
      color: #666;
    }
  }
  .information-list__box:last-child {
    border-bottom: none;
  }
}
</style>
