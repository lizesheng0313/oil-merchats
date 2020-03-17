<template>
  <div class="advice">
    <textarea placeholder="请输入您的意见" v-model="advice"></textarea>
    <div class="next" @click="handleSubmit">确定</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      advice: ""
    };
  },
  methods: {
    handleSubmit() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "lightService",
            subService: "addFeedback"
          },
          feedback: this.advice
        })
        .then(res => {
          if (res.Head.state === "succ") {
            wx.showToast({
              title: "已提交感谢您的保贵意见",
              icon: "none",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.go(1);
            }, 2000);
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.advice {
  margin: 20px;
  textarea {
    min-height: 200px;
    width: 100%;
    border: 1px solid #eee;
    padding: 20px;
    font-size: 14px;
    box-sizing: border-box;
  }
  .next {
    @include next;
  }
}
</style>
