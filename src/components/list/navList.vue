<template>
  <article class="nav-list-warp">
    <div
      v-for="(item,index) in navArr"
      :key="index"
      class="flex-box nav-list-item"
      @click="handleJumpPage(item.url)"
    >
      {{item.title}}
      <span class="icon-qianjin iconfont"></span>
    </div>
  </article>
</template>
<script>
export default {
  props:{
    navArr:Array
  },
  methods: {
    handleJumpPage(url) {
      this.$router.push(url)
    }
  }
};
</script>
<style lang="scss" scoped>
.nav-list-warp {
  margin: 0 17.5px;
  .iconfont{
    font-size:12px;
  }
  .nav-list-item {
    color: #252525;
    font-size: 16px;
    padding: 20px 0;
    font-weight: 400;
  }
  .flex-box {
    justify-content: space-between;
    border-bottom: 1px solid #eee;
  }
}
</style>
