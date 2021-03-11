<template>
  <div class="home">
    <h1 class="title">MoVue</h1>
    <div class="content">
      <MoviesListing v-on:show-details="showMovieDetails($event)" />
      <MoviesDetails :movie-info="movieInfo" />
    </div>
  </div>
</template>

<script>
import MoviesListing from "@/components/MoviesListing/MoviesListing.vue";
import MoviesDetails from "@/components/MovieDetails/MoviesDetails";

export default {
  name: "Home",
  components: {
    MoviesDetails,
    MoviesListing,
  },
  data() {
    return {
      movieInfo: {},
    };
  },
  methods: {
    showMovieDetails(movieInfo) {
      this.movieInfo = movieInfo;
    },
  },
};
</script>

<style src="./style.scss" lang="scss"></style>
