<template>
  <div class="login">
    <div>
      <img src class="login-logo" />
      <div class="login-input">
        <input
          class="pas"
          type="number"
          placeholder="请输入手机号"
          v-model="ruleForm.cellPhone"
          maxlength="11"
        />
      </div>
      <div class="login-input">
        <input
          type="password"
          placeholder="6-20位数字、字母或符号两种组合"
          v-model="ruleForm.password"
          maxlength="20"
          class="pas"
        />
      </div>
      <div class="login-input">
        <input
          type="number"
          placeholder="请输入验证码"
          v-model="ruleForm.verifyPhoneCode"
          maxlength="6"
          class="input-basis pas"
        />
        <span class="mp-close iconfont iconfont_code" :class="{iconfont_right:countDown !='获取验证码'}"></span>
        <button class="login-getcode" @click="handleCheckUser" :disabled="isGetCode">
          <span>{{countDown}}</span>
        </button>
      </div>
      <div class="login-button" @click="handleConfirm">
        <span class="iconfont icon-jiazai loading" v-if="isConfirmLoading"></span>
        登录
      </div>
    </div>
  </div>
</template>
<script>
import { valideIsNull, validatePhone } from "@/utils/validate";
import { mapState } from "vuex";
export default {
  data() {
    return {
      ruleForm: {
        cellPhone: "",
        password: "",
        verifyPhoneCode: ""
      },
      isGetCode: false,
      countDown: "获取验证码"
    };
  },
  mounted() {},
  onUnload() {
    clearInterval(this.timmer);
    this.countDown = "获取验证码";
    this.isGetCode = false;
  },
  methods: {
    handleCheckUser() {
      let validePhone = validatePhone(this.ruleForm.cellPhone);
      if (validePhone) {
        wx.showLoading({
          title: "发送中",
          icon: "none",
          mask: true
        });
        this.mode.cellPhone = this.ruleForm.cellPhone;
        this.$store.dispatch("actionSend", this.mode).then(res => {
          if (res.success) {
            this.ruleForm.username = res.data;
            clearInterval(this.timmer);
            wx.showToast({
              title: "已发送验证码，请注意查收",
              icon: "none"
            });
            this.isGetCode = true;
            let second = 60;
            this.timmer = setInterval(() => {
              this.countDown = --second + "秒后重新发送";
              if (second < 0) {
                clearInterval(this.timmer);
                this.countDown = "获取验证码";
                this.isGetCode = false;
              }
            }, 1000);
          }
        });
      }
    },
    fetchLogin() {
      this.$store
        .dispatch("actionRequest", {
          queryId: "getDieselPrice"
        })
        .then(res => {
          this.oilInfoList = res.Body.data;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  .footer_tips {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
  }
  label {
    color: #333;
    padding: 0 10px 0 11px;
    display: inline-block;
    width: 20%;
    font-size: 15px;
  }
  .login-logo {
    width: 71px;
    height: 71px;
    margin: 0 auto;
    display: block;
    margin-bottom: 35.5px;
  }
  .login-button {
    @include gradientButton;
    margin-top: 36.5px;
  }
  .login-input {
    display: flex;
    margin: 0 27.5px 20px 27.5px;
    height: 45px;
    border-radius: 22.5px;
    background: #f5f5f5;
    line-height: 45px;
    position: relative;
    input {
      height: 100%;
      color: #303030;
      font-size: 14px;
      flex-grow: 1;
      padding-right: 20px;
    }
  }
  .input-basis {
    width: 100px;
  }
  .login-logo {
    height: 79.5px;
    width: auto;
    width: 97.5px;
    display: block;
    margin: 35px auto;
  }
  .login-input {
    display: flex;
    margin: 0 27.5px 20px 27.5px;
    height: 45px;
    border-radius: 22.5px;
    background: #f5f5f5;
    line-height: 45px;
    position: relative;
    .pas {
      padding-left: 30px;
    }
    .iconfont {
      color: #969699;
      width: 35px;
      display: inline-block;
      text-align: center;
    }
    input {
      height: 100%;
      color: #303030;
      font-size: 15px;
    }
    .login-getcode {
      position: absolute;
      right: 19.5px;
      top: 0;
      z-index: 2;
      color: $mainColor;
      font-size: 13px;
      background: none;
      span {
        border-left: 1px solid #c1c1c1;
        padding-left: 12.5px;
      }
    }
    .iconfont_code {
      right: 100px;
      z-index: 999;
    }
    .iconfont_right {
      right: 120px;
      z-index: 999;
    }
    .login-remember {
      position: absolute;
      right: 10px;
      top: 0;
      z-index: 999;
    }
  }
}
</style>
