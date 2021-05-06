<template>
  <section>
    <label for="search-box-movie"></label>
    <input
      id="search-box-movie"
      v-model="$store.state.searchText"
      placeholder="Search your movie"
      autocomplete="off"
    />
    <transition name="fade">
      <button
        v-show="$store.state.searchText.length"
        id="clear-search"
        @click="clearSearch"
      >
        <img alt="" src="@/assets/cancel.svg" />
      </button>
    </transition>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";
import _debounce from "lodash.debounce";
import { mapState } from "vuex";

export default Vue.extend({
  name: "MovieSearch",
  data() {
    return {
      movieList: [] as MovieInterface[],
    };
  },
  computed: mapState(["searchText"]),
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
      this.$store.commit("setSearchText", "");
    },
    search() {
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
