<template>
  <section id="movie-panel">
    <FacetsPanel v-if="$store.state.movies.length" />
    <section id="movie-listing-and-search">
      <section id="movie-search">
        <label for="search-box-movie"></label>
        <input
          id="search-box-movie"
          v-model="searchText"
          placeholder="Search your movie"
        />
      </section>
      <MoviesListing
        v-if="$store.state.movies.length"
        :movie-list="movieList"
      />
    </section>
  </section>
</template>

<script lang="ts">
import MoviesListing from "@/components/MoviesListing/MoviesListing.vue";
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";
import _debounce from "lodash.debounce";
import axios from "axios";
import FacetsPanel from "@/components/FacetsPanel/FacetsPanel.vue";
//
export default Vue.extend({
  name: "MoviePanel",
  components: {
    FacetsPanel,
    MoviesListing,
  },
  data() {
    return {
      searchText: "" as string,
      movieList: [] as MovieInterface[],
    };
  },
  /**
   * THIS IS A BIG ÑAPA BECAUSE IT STILL MAKES THE API CALLS (YOU CAN SEE IT IN THE CONSOLE,
   * BUT:
   * IT LOOKS LIKE IT WORKS, WHICH IS WHAT MATTERS FOR THE DEMO :D
   */
  watch: {
    searchText(newSearchText, oldSearchText) {
      if (newSearchText.length < oldSearchText.length)
        this.$store.dispatch("clearFacets");

      this.search();
    },
  },
  methods: {
    search() {
      this.$store.dispatch("setSearchText", this.searchText);

      let preApiCallWithDebounce = _debounce(() => {
        this.preFetch();
      }, 600);
      if (this.$store.state.axiosCancel.token != null) {
        preApiCallWithDebounce.cancel();
        this.$store.state.axiosCancel.cancel();
      }
      preApiCallWithDebounce();
    },

    preFetch() {
      if (this.$store.state.axiosCancel.token != null) {
        //ÑAPA?
        this.$store.state.axiosCancel.cancel();
      }
      this.$store.dispatch("searchMovies");
    },
  },
});
</script>

<style src="./style.scss" lang="scss"></style>
