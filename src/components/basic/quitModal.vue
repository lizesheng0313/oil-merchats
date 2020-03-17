<template>
  <div class="mask" v-if="isShow">
    <div class="modal">
      <div class="modal-wapper">
        <p class="title" v-if="title">{{title}}</p>
        <p class="content" :class="{center:!contentTips}">{{content}}</p>
        <p class="content-tips" v-if="contentTips">{{contentTips}}</p>
      </div>
      <div class="flex-box">
        <span v-if="showCancel" class="cancle" @click="cancel">取消</span>
        <span class="confirm" @click="confirm">确定</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
    content: String,
    showCancel: Boolean,
    contentTips: String
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    show() {
      this.isShow = true;
    },
    cancel() {
      this.isShow = false;
      this.$emit("cancle");
    },
    confirm() {
      this.isShow = false;
      this.$emit("confirm");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  font-size: 14px;
  border-radius: 8px;
  background: #fff;
  min-width: 280px;
  max-width: 280px;
  .modal-wapper {
    padding: 0 16px;
  }
  .title {
    text-align: center;
    padding: 23px 0 0px 0;
    font-size: 16px;
    font-weight: 600;
  }
  .content {
    font-size: 14px;
    padding-top: 15px;
  }
  .content-tips {
    color: #999;
    margin-top: 10px;
  }
  .flex-box {
    border-top: 1px solid #ededed;
    margin-top: 25px;
    span {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 44px;
      font-size: 16px;
    }
    .cancle {
      border-right: 1px solid #ededed;
      color: #a5a5a5;
    }
    .confirm {
      color:$mainColor;
    }
  }
  .center {
    text-align: center;
  }
}
// .my,
// .goback {
//   .content {
//     text-align: center;
//   }
// }
.sign {
  .content,
  .content-tips {
    color: #666;
  }
  .content-tips {
    margin-top: 5px;
  }
  .flex-box {
    margin-top: 10px;
  }
}
</style>

