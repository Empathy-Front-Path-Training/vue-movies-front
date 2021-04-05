<template>
  <section class="movie-panel">
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

export default Vue.extend({
  name: "MoviePanel",
  components: {
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
        axios
          .get("http://localhost:8080/search?query=" + this.searchText, {
            cancelToken: this.axiosCancel.token,
          })
          .then((response) => {
            this.$store.dispatch("setMovies", response.data.items);
          });
      } else {
        await this.$store.dispatch("unselectMovie");
      }
    },
  },
});
</script>

<style src="./style.scss" lang="scss"></style>
