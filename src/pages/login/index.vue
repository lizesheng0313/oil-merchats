<template>
  <div class="login">
    <div>
      <img src="../../assets/images/logo.png" class="login-logo" />
      <div class="login-input">
        <input
          class="pas"
          type="number"
          placeholder="请输入手机号"
          v-model="ruleForm.loginId"
          maxlength="11"
        />
      </div>
      <div class="login-input">
        <input
          type="test"
          placeholder="请输入图片验证码"
          v-model="ruleForm.imageCode"
          maxlength="6"
          class="input-basis pas"
        />
        <img :src="imageCode" alt class="picture_code" />
      </div>
      <div class="login-input">
        <input
          type="password"
          placeholder="请输入密码"
          v-model="ruleForm.pwd"
          maxlength="20"
          class="pas"
        />
      </div>
      <div class="login-mode" @click="handleToPasssword">忘记密码</div>
      <div class="login-button" @click="handleConfirm">登录</div>
    </div>
  </div>
</template>
<script>
import { valideIsNull, validatePhone } from "@/utils/validate";
import { mapState } from "vuex";
export default {
  data() {
    return {
      imageCode: "",
      ruleForm: {
        loginId: "",
        imageCode: "",
        pwd: ""
      }
    };
  },
  mounted() {
    this.fetchRquestImage();
  },
  methods: {
    fetchRquestImage() {
      this.$store.dispatch("actionRquestImage").then(res => {
        this.imageCode = res.engine.response;
        this.imageCode = this.imageCode.replace(/\s/g, "");
      });
    },
    handleToPasssword() {
      this.$router.push("/pages/login/forgetPassword/main");
    },
    handleConfirm() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "userLogin"
          },
          userLogin: this.ruleForm
        })
        .then(res => {
          if (res.data.Head.state === "succ") {
            this.$store.commit(
              "UPDATETOKEN",
              res.headers["set-cookie"][0].split(",")[1]
            );
            this.$store
              .dispatch("actionRequest", {
                head: {
                  service: "appGroup",
                  subService: "userSellerService.isBind"
                }
              })
              .then(res => {
                if (res.Body.status === "02") {
                  this.$router.push({
                    path: "/pages/home/main",
                    isTab: true
                  });
                } else {
                  this.$router.push({
                    path: "/pages/openShop/main",
                    query: {
                      index: res.Body.status.substr(1, 1)
                    }
                  });
                }
              });
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.login {
  .picture_code {
    width: 120px;
    height: 100%;
  }
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
  .login-mode {
    margin: 10px 32.5px 36.5px 33px;
    font-size: 14px;
    color: $mainColor;
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
