<template>
  <section class="home">
    <h1 class="title">MoVue</h1>
    <MoviePanel />
  </section>
</template>

<script lang="ts">
import MoviePanel from "@/components/MoviePanel/MoviePanel.vue";
import Vue from "vue";
export default Vue.extend({
  name: "Home",
  components: {
    MoviePanel,
  }
});
</script>

<style src="./style.scss" lang="scss"></style>
