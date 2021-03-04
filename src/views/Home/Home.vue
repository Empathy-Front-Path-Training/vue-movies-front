<template>
  <div class="home">
    <h1 class="title">MoVue</h1>
    <div class="content">
      <MoviesListing v-on:show-details="showMovieDetails($event)" />
      <MoviesDetails :movie="movie" />
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>

<script>
// @ is an alias to /src
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
      movie: {},
    };
  },
  methods: {
    showMovieDetails(movie) {
      this.movie = movie;
    },
  },
};
</script>
