<template>
  <div class="credit">
    <div class="apply_content">
      <div class="content_title">
        <img src="../../assets/images/credit1.png" />
        <span>赊呗申请</span>
      </div>
      <div class="recommended-name">
        <span>推荐人</span>
        <input type="text" placeholder="请输入完整姓名" disabled v-model="recommendIdForm.name" />
      </div>
      <div class="content_title">
        <img src="../../assets/images/credit2.png" />
        <span>身份信息和证件</span>
      </div>
      <div class="certificate">
        <div class="card" @click="camera('frontPhoto')">
          <img :src="frontPhoto" alt v-if="frontPhoto" />
          <img src="http://pic.youbenben.net/static/image/idCard/cardFront.png" v-else />
          <div>
            <p>上传身份证照片（人像面）</p>
            <span>请按照示例图上传电子照片</span>
          </div>
        </div>
        <div class="card" @click="camera('backPhoto')">
          <img :src="backPhoto" alt v-if="backPhoto" />
          <img src="http://pic.youbenben.net/static/image/idCard/cardBehind.png" v-else />
          <div>
            <p>上传身份证照片（国旗面）</p>
            <span>请按照示例图上传电子照片</span>
          </div>
        </div>
        <div class="driver_card" @click="camera('otherProof')">
          <img :src="otherProof" alt v-if="otherProof" />
          <img src="http://pic.youbenben.net/static/image/idCard/driverLicense.png" v-else />
          <div class="tips">
            <p>上传驾驶证照片</p>
            <span>请按照示例图上传电子照片</span>
          </div>
        </div>
        <div class="driver_card" @click="camera('licenseImg')">
          <img :src="licenseImg" alt v-if="licenseImg" />
          <img src="http://pic.youbenben.net/static/image/idCard/motor.png" v-else />
          <div class="tips">
            <p>上传行驶证照片</p>
            <span>请按照示例图上传电子照片</span>
          </div>
        </div>
        <div class="driver_card" @click="camera('escortCardImg')">
          <img :src="escortCardImg" alt v-if="escortCardImg" />
          <img src="http://pic.youbenben.net/static/image/idCard/operating.png" v-else />
          <div class="tips">
            <p>上传运营证照片</p>
            <span>请按照示例图上传电子照片</span>
          </div>
        </div>
      </div>
    </div>
    <div class="agree">
      <input type="checkbox" class="radio" :checked="isChecked" color="#2D78ED" />
      <span>阅读并同意相关条款</span>
    </div>
    <div class="next" @click="next">提交申请</div>
    <p class="tip">本服务由油奔奔提供底层技术支持</p>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      recommendId: "",
      frontPhoto: "",
      backPhoto: "",
      licenseImg: "",
      escortCardImg: "",
      otherProof: "",
      applyForm: {
        recommendId: "",
        otherProof: "",
        frontPhoto: "",
        backPhoto: "",
        licenseImg: "",
        escortCardImg: ""
      },
      recommendIdForm: {}
    };
  },
  mounted() {
    this.$store
      .dispatch("actionRequest", {
        queryId: "getRecommendSellerList"
      })
      .then(res => {
        this.recommendIdForm = res.Body.data[0];
      });
  },
  methods: {
    camera(item) {
      let that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success(res) {
          that[item] = res.tempFilePaths[0];
          that.applyForm[item] = wx
            .getFileSystemManager()
            .readFileSync(res.tempFilePaths[0], "base64");
        }
      });
    },
    next() {
      this.applyForm.recommendId = this.recommendIdForm.id;
      this.$store
        .dispatch("actionRequest", {
          head: {
            service: "appGroup",
            subService: "creditAccountService.apply"
          },
          recommendId: this.applyForm.recommendId,
          frontPhoto: this.applyForm.frontPhoto,
          backPhoto: this.applyForm.backPhoto,
          licenseImg: this.applyForm.licenseImg,
          escortCardImg: this.applyForm.escortCardImg
        })
        .then(res => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.credit {
  background: #f7f8f9;
  height: 100%;
  padding-top: 30px;
  .agree {
    margin: 30px 0 30px 23px;
  }
  .certificate {
    padding-bottom: 18.5px;
    .driver_card {
      padding: 20px 0;
      display: flex;
      border-bottom: 1px solid #e7e7e7;
      flex-direction: column;
      align-items: center;
      img {
        width: 203px;
        height: 129px;
      }
      .tips {
        display: flex;
        margin-top: 12px;
        flex-direction: column;
        align-items: center;
        p {
          font-size: 15px;
          color: #666;
        }
        span {
          color: #ccc;
          font-size: 13px;
        }
      }
    }
    .card {
      padding: 20px 0;
      display: flex;
      border-bottom: 1px solid #e7e7e7;
      align-items: center;
      img {
        width: 128px;
        height: 83.5px;
        margin-right: 20px;
      }
      p {
        font-size: 15px;
        color: #666;
      }
      span {
        color: #ccc;
        font-size: 13px;
      }
    }
  }
  .apply_content {
    margin: 0 9px 0 9px;
    background: #fff;
    padding: 0 13px 0 13px;
    border-radius: 10px;
    .recommended-name {
      display: flex;
      height: 50px;
      margin-top: 18.5px;
      align-items: center;
      border-top: 1px solid #e7e7e7;
      border-bottom: 1px solid #e7e7e7;
      span {
        color: #323232;
        font-size: 16px;
        font-weight: 500;
      }
      input {
        flex: 1;
        text-align: right;
      }
    }
    .content_title {
      font-size: 18px;
      padding-top: 18px;
      font-weight: 500;
      color: #303030;
      display: flex;
      align-items: center;
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }
  .radio {
    transform: scale(0.7);
  }
  .next {
    height: 40px;
    background: $mainGradientColor;
    border-radius: 45px;
    margin: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #fff;
    margin-bottom: 18.5px;
  }
  .tip {
    color: #b0b0b0;
    font-size: 10px;
    margin-bottom: 18px;
    text-align: center;
  }
}
</style>
