<template>
  <section>
    <label for="search-box-movie"></label>
    <input
      id="search-box-movie"
      v-model="searchText"
      placeholder="Search your movie"
    />
    <transition name="fade">
      <button v-show="searchText.length" @click="clearSearch" id="clear-search">
        <img alt="" src="@/assets/cancel.svg" />
      </button>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";
import _debounce from "lodash.debounce";

export default Vue.extend({
  name: "MovieSearch",

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
    searchText(newSearchText) {
      this.$store.commit("setResultsLoaded", false);
      this.$store.commit("clearSelectedFacets");

      if (!newSearchText.length) {
        this.$store.commit("clearFacets");
        this.$store.commit("clearResults");
      }
      this.search();
    },
  },
  methods: {
    clearSearch() {
      this.searchText = "";
    },
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
