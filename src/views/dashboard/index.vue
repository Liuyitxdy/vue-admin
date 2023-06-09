<template>
  <div class="dashboard-container">
    <today-data></today-data>
    <charts></charts>
  </div>
</template>

<script>
import Charts from "@/components/Dashboard/Chart.vue";
import todayData from "@/components/Dashboard/Data.vue";
export default {
  name: "index",
  data() {
    return {};
  },
  components: {
    Charts,
    todayData,
  },
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
</style>
