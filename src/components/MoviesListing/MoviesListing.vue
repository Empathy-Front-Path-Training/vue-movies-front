<template>
  <!--Transition not working :D-->
  <section id="movie-list-section">
    <h2>List of movies</h2>
    <ul id="movie-list">
      <MovieItem
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie"
        @select-movie="showDetails($event)"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import MovieItem from "@/components/MoviesListing/components/MovieItem.vue";
import { movies } from "@/mocks/movies";
import Vue from "vue";
import { MovieMockInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "MoviesListing",
  components: { MovieItem },
  data() {
    return {
      movies: movies as Array<MovieMockInterface>,
    };
  },
  methods: {
    showDetails(movieId: string) {
      this.$emit("show-details", movieId);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
