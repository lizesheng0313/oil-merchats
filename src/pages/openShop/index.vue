<template>
  <div class="open-shop">
    <div class="step">
      <van-steps :steps="steps" :active="active" />
    </div>
    <!-- <div v-if="active === 1" class="each_step">
      <div class="flex-space_center deposit">
        <p>
          押金
          <span>（可退）</span>
        </p>
        <p>1000元</p>
      </div>
      <p class="tips">为保证合规经营，需缴纳押金</p>
      <div>
        <radio-group @change="radioChange" class="pay_radio">
          <label v-for="(item,index) in radioList" :key="index">
            <div>
              <input
                type="checkbox"
                :value="item.name"
                class="radio"
                :checked="payType==item.payType"
                color="#2D78ED"
              />
              <span class="name">{{item.name}}</span>
            </div>
            <span class="content">{{item.content}}</span>
          </label>
        </radio-group>
      </div>
      <div class="submit_btn" @click="handleConfirm">押金充值</div>
    </div>-->
    <div v-if="active === 1" class="each_step">
      <strong>实名认证</strong>
      <p>我们将根据实名信息，为您购买《用车保险》</p>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      radioList: [
        {
          name: "线下支付",
          payType: "01"
        },
        {
          name: "微信支付",
          payType: "02"
        }
      ],
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
      active: 1
    };
  }
};
</script>
<style lang="scss" scoped>
.open-shop {
  padding-top: 50px;
  background: #f7f8f9;
  .step {
    padding: 0 15px;
  }
  .each_step {
    background: #fff;
    .deposit {
      padding: 0 20px;
      margin-top: 20px;
    }
    .deposit {
      padding: 20px 20px 0 20px;
      font-size: 16px;
      span {
        font-size: 12px;
      }
    }
    .tips {
      margin: 20px 0;
      font-size: 12px;
      padding-left: 20px;
      color: #777;
    }
    .pay_radio {
      padding: 0 20px;
      flex-direction: column;
      margin: 0;
      ._label {
        height: 40px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        margin-right: 0;
        .name {
          margin-left: 50px;
        }
      }
    }
    .submit_btn {
      @include gradientButton;
      margin-top: 36.5px;
    }
  }
}
</style>
