<template>
  <section id="home">
    <h1 id="home-title" class="company-title">MoVue</h1>
    <FacetsPanel id="facets-component" />
    <MovieSearch id="movie-search-component" />
    <SuggestionPanel id="suggestion-component" />
    <MovieResults id="movie-results-component" />
  </section>
</template>

<script lang="ts">
import MovieSearch from "@/components/MovieSearch/MovieSearch.vue";
import Vue from "vue";
import FacetsPanel from "@/components/FacetsPanel/FacetsPanel.vue";
import MovieResults from "@/components/MovieResults/MovieResults.vue";
import SuggestionPanel from "@/components/SuggestionPanel/SuggestionPanel.vue";
export default Vue.extend({
  name: "Home",
  components: {
    SuggestionPanel,
    MovieResults,
    FacetsPanel,
    MovieSearch,
  },
});
</script>

<style src="./style.scss" lang="scss"></style>
