<template>
  <div class="mine">
    <div class="header" @click="handleToPersonal">
      <view class="header_user">
        <open-data type="userAvatarUrl" class="head"></open-data>
        <open-data type="userNickName" class="user-nick_name"></open-data>
      </view>
      <div class="iconfont iconyou"></div>
    </div>
    <div class="mine-info">
      <div @click="handleToCapital">
        <span>{{userInfo.totalAmount}}</span>
        <p>账户余额</p>
      </div>
      <div @click="handleTopreferential">
        <span>{{userInfo.couponCount}}</span>
        <p>优惠卷</p>
      </div>
      <div>
        <span>{{userInfo.couponCount}}</span>
        <p>积分</p>
      </div>
    </div>
    <div class="mine-nav">
      <div
        v-for="(item,index) in nav"
        @click="handleToUrl(item.url)"
        class="mine-nav_wapper"
        :key="index"
      >
        <img :src="item.src" class="nav-icon" />
        <div class="nav-link">{{ item.title }}</div>
        <div class="iconfont iconyou"></div>
      </div>
      <button class="mine-nav_wapper" open-type="contact" hover-class="none">
        <img src="../../assets/images/m6.png" class="nav-icon" />
        <div class="nav-link">在线客服</div>
        <div class="iconfont iconyou"></div>
      </button>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      userInfo: "userInfo"
    })
  },
  data() {
    return {
      nav: [
        {
          title: "收货地址",
          src: require("../../assets/images/m1.png"),
          url: "/pages/mine/address/main"
        },
        {
          title: "消息通知",
          src: require("../../assets/images/m2.png"),
          url: "/pages/mine/message/main"
        },
        {
          title: "关于平台",
          src: require("../../assets/images/m3.png"),
          url: "/pages/mine/about/main"
        },
        {
          title: "意见反馈",
          src: require("../../assets/images/m4.png"),
          url: "/pages/mine/advice/main"
        },
        {
          title: "联系我们",
          src: require("../../assets/images/m5.png"),
          url: "/pages/mine/contact/main"
        }
      ]
    };
  },
  methods: {
    handleToUrl(url) {
      this.$router.push(url);
    },
    handleToPersonal() {
      this.$router.push("/pages/mine/personal/main");
    },
    handleToCapital() {
      this.$router.push("/pages/mine/capital/main");
    },
    handleTopreferential() {
      this.$router.push("/pages/mine/preferential/main");
    }
  }
};
</script>
<style lang="scss" scoped>
.mine {
  min-height: 100vh;
  background: #f7f8f9;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 18px;
    &_user {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-align: left;
      .head {
        width: 45px;
        height: 45px;
        border-radius: 100px;
        display: inline-block;
        overflow: hidden;
      }
      .user-nick_name {
        display: inline-block;
        font-size: 18px;
        margin-left: 20px;
        color: #676767;
      }
    }
  }
  .mine-info {
    height: 69.5px;
    margin: 0 12.5px 25px 12.5px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background: #fff;
    justify-content: space-around;
    box-sizing: border-box;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 1;
      border-right: 1px solid #efefef;
      span {
        color: $mainColor;
        font-size: 21px;
      }
      p {
        color: #666;
        font-size: 14px;
      }
    }
    div:last-child {
      border: none;
      padding: 0;
    }
  }
  .mine-nav {
    background: #fff;
    margin: 0 12.5px;
    padding: 0 9px;
    border-radius: 10px;
    &_wapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-align: left;
      border-bottom: 1px solid #eee;
      height: 50px;
      .nav-box {
        background: #fff;
        padding-left: 15px;
      }
      .nav-icon {
        height: 19px;
        width: 19px;
      }
      .nav-icon:last-child {
        height: 20px;
        width: 20px;
      }
      .nav-link {
        font-size: 15px;
        color: #444;
        margin-left: 12px;
        flex-grow: 1;
      }
      .nav-container {
        background: #fff;
      }
    }
    &_wapper:last-child {
      border: none;
    }
  }
}
</style>
