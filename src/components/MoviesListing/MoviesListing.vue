<template>
  <!--Transition not working :D-->
  <section id="movie-list-section">
    <h2>List of movies</h2>
    <ul id="movie-list">
      <MovieItem
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie"
        v-on:select-movie="showDetails($event)"
      >
      </MovieItem>
    </ul>
  </section>
</template>

<script>
import { movies } from "@/mocks/movies";
import MovieItem from "@/components/MoviesListing/components/MovieItem";

export default {
  name: "MoviesListing",
  components: { MovieItem },
  data() {
    return {
      movies: movies,
    };
  },
  methods: {
    showDetails(movieInfo) {
      this.$emit("show-details", movieInfo);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
