<template>
  <div class="personal">
    <adv :isNotMargin="true"></adv>
    <div class="content">
      <div class="flex-between">
        <span>头像</span>
        <div class="flex-box flex-align_center">
          <open-data type="userAvatarUrl" class="head value"></open-data>
        </div>
      </div>
      <div class="flex-between">
        <span>用户名</span>
        <div class="flex-box flex-align_center">
          <open-data type="userNickName" class="value"></open-data>
        </div>
      </div>
      <div class="flex-between">
        <span>手机</span>
        <div class="flex-box flex-align_center">
          <p class="value">{{userInfo.phone}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import adv from "@/components/basic/adv";
import { mapState } from "vuex";
export default {
  components: {
    adv
  },
  computed: {
    ...mapState({
      userInfo: "userInfo"
    })
  },
  data() {
    return {};
  },
  onShow() {},
  methods: {}
};
</script>
<style lang="scss" scoped >
.personal {
  min-height: calc(100vh - 12.5px);
  padding-top: 9px;
  background: #f7f8f9;
  .content {
    background: #fff;
    margin: 9px 9px 0 9px;
    color: #b2b2b2;
    border-radius: 10px;
    .iconyou {
      color: #b2b2b2;
    }
    span {
      color: #323232;
    }
    .value {
      margin-right: 5px;
    }
    .head {
      width: 35px;
      height: 35px;
      border-radius: 100px;
      display: inline-block;
      overflow: hidden;
    }
    .flex-between {
      padding: 10px 10px 10px 18px;
      align-items: center;
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
