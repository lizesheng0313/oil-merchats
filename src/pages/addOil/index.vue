<template>
  <div class="add-oil">
    <location></location>
    <div class="adv-fixed">
      <adv></adv>
    </div>
    <div class="add-info">
      <div class="add-info_address" @click="handleGoSelectLocation">
        <div class="add-info_address-left">
          <img src="../../../static/images/icon/addoil.png" mode="widthFix" class="oil" />
          <span>{{location.content||address}}</span>
        </div>
        <img src="../../../static/images/icon/btn_next.png" class="btn_next" alt />
      </div>
      <radio-group @change="radioChange">
        <label v-for="(item,index) in radioList" :key="index">
          <input
            type="radio"
            :value="item.name"
            class="radio"
            :checked="pattern==item.name"
            color="#2D78ED"
          />
          {{item.title}}
        </label>
      </radio-group>
      <div
        class="add-info_address select_agent"
        style="border-bottom:none;padding:0;border-top:1px solid #e7e7e7;padding-top:5px;"
        @click="handleSelectAgent"
        v-if="pattern == '02'"
      >
        <div class="add-info_address-left">
          <span>代付人：</span>
          <span v-if="agent.nickName">{{agent.nickName}}</span>
          <span v-else>请选择代付人</span>
        </div>
        <img src="../../../static/images/icon/btn_next.png" class="btn_next" alt />
      </div>
    </div>
    <div class="next" @click="next">下一步</div>
  </div>
</template>
<script>
import location from "@/components/basic/location";
import adv from "@/components/basic/adv";
import { mapState } from "vuex";
export default {
  components: {
    location,
    adv
  },
  data() {
    return {
      payAgent: "请选择代付人",
      address: "加油地址",
      radioList: [
        { name: "01", title: "直接支付" },
        { name: "02", title: "找人代付" }
      ],
      pattern: ["01"]
    };
  },
  computed: {
    ...mapState({
      location: "location",
      agent: "agent"
    })
  },
  mounted() {
    this.$store.commit("SETAGENT", {
      nickName: "",
      phone: "",
      uid: ""
    });
  },
  methods: {
    handleSelectAgent() {
      this.$router.push({
        path: "/pages/addOil/agent/main"
      });
    },
    handleGoSelectLocation() {
      this.$router.push({
        path: "/pages/addOil/selectLocation/main"
      });
    },
    radioChange(e) {
      this.pattern = e.target.value;
    },
    next() {
      if (!this.location.content) {
        wx.showToast({
          title: "请选择加油地址",
          icon: "none"
        });
        return;
      }
      if (this.pattern === "02" && !this.agent.uid) {
        wx.showToast({
          title: "请选择代付人",
          icon: "none"
        });
        return;
      }
      this.$router.push({
        path: "/pages/addOil/oilOrder/main",
        query: { paymentMethod: this.pattern }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-oil {
  position: relative;
  radio-group {
    margin-top: 5px;
  }

  .add-info {
    border-radius: 10px;
    position: fixed;
    bottom: 70px;
    color: #333;
    min-height: 10px;
    box-sizing: border-box;
    left: 10px;
    right: 10px;
    background: #fff;
    padding: 5px 15px 40px 15px;
    .oil {
      width: 20px;
      height: 20px;
    }
    &_address {
      align-items: center;
      display: flex;
      border-bottom: 1px solid #e7e7e7;
      justify-content: space-between;
      padding-bottom: 15px;
      &-left {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          margin-right: 20px;
          @include ellipsis;
          max-width: 300px;
        }
        img {
          margin-right: 11.5px;
        }
      }
    }
    .select_agent {
      position: absolute;
      bottom: -2px;
      left: 17px;
      right: 15px;
    }
  }
  .next {
    @include next;
    bottom: 5px;
  }
}
.adv-fixed {
  position: fixed;
  bottom: 200px;
  width: 100%;
  height: 90px;
}
.add-info_address {
  padding-bottom: 10px !important;
}
</style>
