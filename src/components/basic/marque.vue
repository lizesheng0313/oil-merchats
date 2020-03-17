<template>
  <div class="roll" style="height:40px;">
    <ul :style="{transform:'translateY(-'+num+'px)'}" :class="{'marquee_top':num}">
      <li v-for="(item,index) in roll" :key="index" style="height:20px;">
        {{item.info}}
        <span>{{item.pubDate}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    roll: {
      type: Array
    },
    cle: {
      type: Boolean
    }
  },
  data() {
    return {
      timer: "",
      num: 0,
      index: 0
    };
  },
  mounted() {
    this.num = 0;
    this.index = 0;
    clearInterval(this.timer);
    this.marquee();
  },
  onShow() {
    if (!this.cle) {
      this.num = 0;
      this.index = 0;
    }
    clearInterval(this.timer);
    this.marquee();
  },
  onUnload() {
    clearInterval(this.timer);
  },
  onHide() {
    clearInterval(this.timer);
  },
  methods: {
    marquee() {
      let len = this.roll.length;
      let i = 1;
      this.timer = setInterval(() => {
        this.index++;
        i = i + 2;
        if (i >= len) {
          i = 0;
          this.index = 0;
        }
        this.num = this.index * 20;
      }, 2000);
    }
  }
};
</script>
<style lang="scss" scoped>
.roll {
  overflow: hidden;
  background-size: 17.5px 14px;
  color: #000;
  font-size: 14px;
  .marquee_top {
    transition: all 0.5s;
  }
  li {
    color: #666;
    span {
      color: #b2b2b2;
      margin-left:30px;
    }
  }
}
</style>
