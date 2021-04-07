<template>
  <section class="movie-panel">
    <FacetsPanel v-if="$store.state.movies.length" />
    <section id="movie-search">
      <label for="search-box-movie"></label>
      <input
        id="search-box-movie"
        v-model="searchText"
        placeholder="Search your movie"
        @input="search"
      />
    </section>
    <MoviesListing v-if="$store.state.movies.length" :movie-list="movieList" />
  </section>
</template>

<script lang="ts">
import MoviesListing from "@/components/MoviesListing/MoviesListing.vue";
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";
import _debounce from "lodash.debounce";
import axios from "axios";
import FacetsPanel from "@/components/FacetsPanel/FacetsPanel.vue";

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
      axiosCancel: {} as any, //ÑAPA
    };
  },
  /**
   * THIS IS A BIG ÑAPA BECAUSE IT STILL MAKES THE API CALLS (YOU CAN SEE IT IN THE CONSOLE,
   * BUT:
   * IT LOOKS LIKE IT WORKS, WHICH IS WHAT MATTERS FOR THE DEMO :D
   */
  methods: {
    search() {
      let preApiCallWithDebounce = _debounce(() => {
        this.preFetch();
      }, 600);
      if (this.axiosCancel.token != null) {
        preApiCallWithDebounce.cancel();
        this.axiosCancel.cancel();
      }
      preApiCallWithDebounce();
    },

    preFetch() {
      if (this.axiosCancel.token != null) {
        //ÑAPA?
        this.axiosCancel.cancel();
      }
      this.searchMovies();
    },
    async searchMovies() {
      if (this.searchText) {
        this.axiosCancel = axios.CancelToken.source();
        let params = {
          query: this.searchText,
          type: "movie",
        };
        axios
          .get("http://localhost:8080/search?", {
            params,
            cancelToken: this.axiosCancel.token,
          })
          .then((response) => {
            this.$store.dispatch("setMovies", response.data.items);
            this.$store.dispatch(
              "setFacetGenres",
              response.data.aggregations[0].genres
            );
            this.$store.dispatch(
              "setFacetTypes",
              response.data.aggregations[1].types
            );
            console.log(this.$store.state.facetGenres);
            this.$store.dispatch(
              "setFacetDecades",
              response.data.aggregations[2].decades
            );
          });
      } else {
        await this.$store.dispatch("unselectMovie");
      }
    },
  },
});
</script>

<style src="./style.scss" lang="scss"></style>
