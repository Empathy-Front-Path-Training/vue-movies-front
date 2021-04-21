<template>
  <section id="home">
    <h1 class="title">MoVue</h1>
    <FacetsPanel id="facets-component" />
    <MovieSearch id="movie-search-component" />
    <MovieResults id="movie-listing-component" />
  </section>
</template>

<script lang="ts">
import MovieSearch from "@/components/MovieSearch/MovieSearch.vue";
import Vue from "vue";
import FacetsPanel from "@/components/FacetsPanel/FacetsPanel.vue";
import MovieResults from "@/components/MovieResults/MovieResults.vue";
export default Vue.extend({
  name: "Home",
  components: {
    MovieResults,
    FacetsPanel,
    MovieSearch,
  },
});
</script>

<style src="./style.scss" lang="scss"></style>
