<template>
  <div class="home">
    <div class="home_bg">
      <div class="home_address">
        <span>{{merchantName}}</span>
      </div>
      <swiper :autoplay="true" :interval="5000" :duration="1000" :circular="true">
        <swiper-item v-for="(item,index) in bannerList" :key="index">
          <img class="slide-image" mode="widthFix" :src="item.imgPath" />
        </swiper-item>
      </swiper>
      <div class="marque flex-box">
        <img class="today_message" mode="widthFix" src="../../assets/images/todayMesesage.png" />
        <marque :roll="oilInfoList"></marque>
      </div>
    </div>
    <div class="home_nav">
      <span>商品管理</span>
      <span>账单明细</span>
    </div>
    <adv></adv>
    <!-- <div class="mask zindex" v-if="islogin === false" catchtouchmove="ture">
      <div class="login">
        <h5>登陆提示</h5>
        <p>您当前未登陆，请您确认授权登录后查看。</p>
        <button open-type="getPhoneNumber" @getphonenumber="bindgetphonenumber" class="open-vip">确定</button>
      </div>
    </div>-->
  </div>
</template>
<script>
import { mapState } from "vuex";
import marque from "@/components/basic/marque";
import adv from "@/components/basic/adv";
import infoList from "@/components/list/infoList";
import goods from "@/components/recommended/goods";
import { promised } from "q";
var QQMapWX = require("../../../static/js/qqmap-wx-jssdk.js");
var qqmapsdk;
export default {
  components: {
    goods,
    marque,
    adv,
    infoList
  },
  data() {
    return {
      merchantName: "商户名",
      bannerList: [],
      oilInfoList: []
    };
  },
  mounted() {
    this.fetchBanner();
    this.fetchOil();
  },
  methods: {
    handleGoRecommended() {
      this.$router.push("/pages/recommendedInfo/main");
    },
    fetchBanner() {
      this.$store
        .dispatch("actionRequest", {
          queryId: "getBannerList",
          showType: "home"
        })
        .then(res => {
          this.bannerList = res.Body.data;
        });
    },
    fetchOil() {
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
.home {
  min-height: 100vh;
  background: #f7f8f9;
  padding-bottom: 18px;
  .home_bg {
    background: url("../../assets/images/header_top.png") no-repeat;
    background-size: 100%;
    .home_address {
      font-size: 17px;
      color: #fff;
      margin-left: 10px;
      display: flex;
      align-items: center;
      padding: 5px;
      img {
        height: 16px;
        width: 12px;
        margin-right: 10px;
      }
    }
  }
  swiper {
    margin: 0 10px;
    height: 210px;
    img {
      width: 100%;
      height: 205px !important;
      border-radius: 10px;
    }
  }
  .marque {
    border-radius: 10px;
    align-items: center;
    margin: 8px 10px 0 10px;
    height: 55px;
    background: #fff;
    .today_message {
      width: 67px;
      margin: 0 20px 0 12px;
    }
  }
  .home_nav {
    margin: 12.5px 10px 0 10px;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    border-radius: 10px;
    justify-content: space-around;
    align-items: center;
    padding: 20px 0;
    span {
      padding: 10px;
      display: inline-block;
      background: $mainGradientColor;
      border-radius: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #fff;
    }
  }
  .home_info {
    margin: 25px 10px 0 10px;
  }
  .header {
    margin-bottom: 12.5px;
    @include flexBetweenCenter;
    .title {
      font-size: 18px;
      font-weight: 500;
      color: #303030;
    }
    .more {
      color: #b2b2b2;
      font-size: 13px;
      @include flexBetweenCenter;
      i {
        font-size: 15px;
      }
    }
  }
  .zindex {
    z-index: 20;
  }
  .login {
    width: 310px;
    height: 204px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #fff;
    left: 50%;
    background: #ffffff;
    border-radius: 5px;
    top: 50%;
    transform: translate(-50%, -50%);
    h5 {
      margin-top: 23.5px;
      font-size: 16px;
      font-weight: 400;
    }
    p {
      margin-top: 12.5px;
      margin-bottom: 36px;
      color: #777;
    }
    .open-vip {
      width: 240px;
    }
    .open-vip {
      background: $mainColor;
      box-shadow: 0 8px 14px 0 rgba(67, 128, 255, 0.4);
      height: 45px;
      line-height: 45px;
      color: #fff;
      margin: 0 14px;
      text-align: center;
      display: block;
      font-size: 16px;
      border-radius: 3px;
    }
  }
}
</style>
