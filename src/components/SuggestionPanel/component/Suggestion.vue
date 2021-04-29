<template>
  <li class="suggestion" @click="updateSearchQuery()">{{ suggestion }}</li>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Suggestion",
  props: {
    suggestion: {
      type: String,
      default: "",
    },
  },
  methods: {
    updateSearchQuery() {
      this.$store.commit("setSearchText", this.suggestion);
    },
  },
});
</script>

<style scoped src="./style.scss" lang="scss"></style>
