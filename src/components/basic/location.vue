<template>
  <div class="location">
    <map
      class="map_container"
      :longitude="location.longitude"
      :latitude="location.latitude"
      scale="18"
      :markers="markers"
    ></map>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      location: "location"
    }),
    markers() {
      return [
        {
          id: 0,
          latitude: this.location.latitude,
          longitude: this.location.longitude,
          iconPath: "/static/images/icon/personal.jpg",
          width: 20,
          height: 20,
          callout: {
            //可根据需求是否展示经纬度
            content: this.location.content,
            color: "#000",
            fontSize: "14px",
            display: "CLICK"
          }
        }
      ];
    }
  }
};
</script>
<style lang="scss" scoped>
.location {
  map {
    width: 100%;
    height: 100vh;
  }
}
</style>
