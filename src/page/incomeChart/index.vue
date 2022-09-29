<template>
  <div>
    <tendency :sevenDate="sevenDate" :sevenDay="sevenDay"></tendency>
  </div>
</template>

<script>
import tendency from "@/components/tendency";
export default {
  data() {
    return {};
  },
  components: {
    tendency,
  },
  mounted() {},
  computed: {},
  methods: {
    sevenDate() {},
    sevenDay() {},
  },
};
</script>

<style scoped>
.data_section {
  padding: 20px;
  margin-bottom: 40px;
}
</style>
