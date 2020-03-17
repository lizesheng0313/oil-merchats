<template>
  <div class="valide-code">
    <img src="../assets/images/logo.png" class="login-logo" />
    <div class="login-input">
      <i class="icon-shouji iconfont"></i>
      <input
        type="number"
        placeholder="请输入手机号"
        v-model="ruleForm.cellPhone"
        maxlength="11"
        @focus="isShowClodeIcon = true"
        @input="mustNumber"
        @blur="handleBlur('isShowClodeIcon')"
      />
      <span class="icon-ic_close iconfont" v-if="isShowClodeIcon" @click="clearInput('cellPhone')"></span>
    </div>
    <div class="login-input" v-if="iscode">
      <i class="icon-yanzhengma iconfont"></i>
      <input
        type="number"
        placeholder="请输入验证码"
        v-model="ruleForm.verifyPhoneCode"
        maxlength="6"
        @focus="isShowClose=true"
        @input="inputKeywords"
        class="input-basis"
        @blur="handleBlur('isShowClose')"
      />
      <span
        class="icon-ic_close iconfont iconfont_code"
        v-if="isShowClose"
        :class="{iconfont_right:countDown !='获取验证码'}"
        @click="clearInput('verifyPhoneCode')"
      ></span>
      <button class="login-getcode" @click="handleCheckUser" :disabled="isGetCode">
        <span>{{countDown}}</span>
      </button>
    </div>
    <div class="login-input" v-else>
      <i class="icon-yanzhengma iconfont"></i>
      <input
        type="password"
        placeholder="请输入登录密码"
        v-model="ruleForm.password"
        maxlength="20"
        @focus="isShowPass = true"
        @input="inputPass"
        @blur="handleBlur('isShowPass')"
      />
      <span class="icon-ic_close iconfont" v-if="isShowPass" @click="clearInput('password')"></span>
    </div>
  </div>
</template>
<script>
import { valideIsNull, validatePhone } from "@/utils/validate";
import { mapState } from "vuex";
export default {
  props: {
    iscode: {
      type: Boolean
    },
    phone: String
  },
  computed: mapState(["user", "password"]),
  data() {
    return {
      isShowPass: false,
      isShowClose: false,
      isShowClodeIcon: false,
      ruleForm: {
        cellPhone: "",
        password: "",
        verifyPhoneCode: "",
        loginType: "BY_PHONE_CODE"
      },
      isGetCode: false,
      mode: {
        cellPhone: "",
        userType: "PERSONAL"
      },
      countDown: "获取验证码"
    };
  },
  onLoad() {
    this.ruleForm.verifyPhoneCode = "";
  },
  mounted() {
    this.ruleForm.cellPhone = this.user;
  },
  onUnload() {
    clearInterval(this.timmer);
    this.countDown = "获取验证码";
    this.isGetCode = false;
    this.ruleForm.loginType = "BY_PHONE_CODE";
  },
  methods: {
    handleBlur(key) {
      setTimeout(() => {
        this[key] = false;
      }, 200);
    },
    clearInput(key) {
      this.ruleForm[key] = "";
      if (key == "cellPhone") {
        this.isShowClodeIcon = false;
      } else {
        this.isShowClose = false;
      }
    },
    mustNumber() {
      this.ruleForm.cellPhone = this.ruleForm.cellPhone.replace(/[^\d]/g, "");
      this.isShowClodeIcon = true;
    },
    inputKeywords() {
      this.isShowClose = true;
    },
    inputPass() {
      this.isShowPass = true;
    },
    handleSwitchLoginMode() {
      this.ruleForm.verifyPhoneCode = "";
      this.ruleForm.password = "";
      if (this.iscode) {
        this.ruleForm.loginType = "BY_PASSWORD";
      } else {
        this.ruleForm.loginType = "BY_PHONE_CODE";
      }
    },
    handleCheckUser() {
      let validePhone = validatePhone(this.ruleForm.cellPhone);
      if (validePhone) {
        this.mode.cellPhone = this.ruleForm.cellPhone;
        this.$store
          .dispatch("loginPageStore/actionCheckUser", this.mode)
          .then(res => {
            if (res.flag) {
              clearInterval(this.timmer);
              wx.showToast({
                title: "已发送验证码，请注意查收",
                icon: "none",
                duration: 2000
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
    handleSignIn() {
      let validePhone = validatePhone(this.ruleForm.cellPhone);
      let valideCode;
      if (validePhone) {
        if (this.iscode) {
          this.ruleForm.password = "";
          valideCode = valideIsNull(this.ruleForm.verifyPhoneCode, "验证码");
        } else {
          valideCode = valideIsNull(this.ruleForm.password, "密码");
        }
        if (valideCode) {
          this.$emit("handLogin", this.ruleForm);
        }
      }
    },
    goForgotPassowrd() {
      this.$router.push({
        path: "/pages/forgotPassword/main",
        query: { phone: this.ruleForm.cellPhone }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.valide-code {
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
