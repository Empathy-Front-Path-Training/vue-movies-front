<template>
  <section class="movie-panel">
    <MoviesListing @show-details="showMovieDetails($event)" />
    <MoviesDetails ref="movieDetails" :movie-id="movie" />
  </section>
</template>

<script>
import MoviesListing from "@/components/MoviesListing/MoviesListing.vue";
import MoviesDetails from "@/components/MovieDetails/MoviesDetails";
export default {
  name: "MoviePanel",
  components: {
    MoviesDetails,
    MoviesListing
  },
  data() {
    return {
      movie: ""
    };
  },
  methods: {
    showMovieDetails(movieId) {
      this.movie = movieId;
      this.$nextTick(() => this.$refs.movieDetails.showSelectedMovie());
    }
  }
};
</script>

<style src="./style.scss" lang="scss"></style>
