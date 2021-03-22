<template>
  <section class="home">
    <h1 class="title">MoVue</h1>
    <MoviePanel />
  </section>
</template>

<script>
import MoviePanel from "@/components/MoviePanel/MoviePanel";

export default {
  name: "Home",
  components: {
    MoviePanel
  }
};
</script>

<style src="./style.scss" lang="scss"></style>
