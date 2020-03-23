<template>
  <div class="open-shop">
    <div class="step">
      <van-steps :steps="steps" :active="active" />
    </div>
    <div v-if="active === 1" class="each_step">
      <strong>实名认证</strong>
      <div class="login-input">
        <input class="pas" type="text" placeholder="姓名" v-model="ruleForm.name" />
      </div>
      <div class="login-input">
        <input class="pas" type="number" placeholder="身份证号" v-model="ruleForm.identityCard" />
      </div>
      <div class="login-input">
        <input class="pas" type="number" placeholder="绑定商户号" v-model="ruleForm.sellerId" />
      </div>
      <div class="login-input">
        <input type="number" placeholder="营业执照编码" v-model="ruleForm.creditCode" class="pas" />
      </div>
      <div class="submit_btn" @click="handleToAuth">去认证</div>
    </div>
    <div v-if="active === 2" class="waiting_audit each_step">
      <img src="../../assets/images/success.png" mode="widthFix" alt />
      <p class="auth_complete">认证完成</p>
      <p class="tips">请等待平台对您的审核</p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      steps: [
        {
          text: "手机验证"
        },
        {
          text: "实名验证"
        },
        {
          text: "等待审核"
        }
      ],
      active: 0,
      ruleForm: {
        name: "",
        identityCard: "",
        sellerId: "",
        creditCode: ""
      }
    };
  },
  mounted() {
    this.active = Math.floor(this.$route.query.index) + 1;
  },
  methods: {
    handleToAuth() {
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: "userSellerService.bindRelation"
          },
          param: this.ruleForm
        })
        .then(res => {
          if (res.Head.state === "succ") {
            this.active = 2;
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.open-shop {
  background: #f7f8f9;
  .step {
    padding: 50px 15px 0 15px;
  }
  .waiting_audit {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 80px;
    }
    .auth_complete {
      margin-top: 10px;
      font-size: 18px;
    }
    .tips {
      font-size: 14px;
      margin-top: 5px;
      color: #777;
    }
  }
  .each_step {
    margin-top: 10px;
    padding-top: 20px;
    background: #fff;
    .submit_btn {
      @include gradientButton;
      margin-top: 36.5px;
    }
    strong {
      padding-left: 30px;
      margin-bottom: 30px;
      font-size: 18px;
    }
    .login-input {
      display: flex;
      margin: 0 27.5px 20px 27.5px;
      height: 45px;
      border-radius: 22.5px;
      background: #f7f8f9;
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
        color: #303030;
        font-size: 14px;
        flex-grow: 1;
        padding-right: 20px;
        height: 100%;
        color: #303030;
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
}
</style>
