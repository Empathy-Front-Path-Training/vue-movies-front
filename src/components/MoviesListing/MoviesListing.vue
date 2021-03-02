<template>
  <section id="movie-list-section">
    <h3>List of movies</h3>
    <ul id="movie-list">
      <MovieItem
        v-for="movie in movies"
        :key="movie.id"
        :title="movie.title"
        :id="movie.id"
        v-on:selectMovie="showDetails($event)"
      >
      </MovieItem>
    </ul>
  </section>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>

<script>
import { searchResults } from "@/mocks/movies";
import MovieItem from "@/components/MoviesListing/components/MovieItem";

export default {
  name: "MoviesListing",
  components: { MovieItem },
  data() {
    return {
      movies: this.listMovies(),
    };
  },
  methods: {
    listMovies() {
      return searchResults.items.map((movie) => movie);
    },
    showDetails(id) {
      this.$emit("showDetails", id);
    },
  },
};
</script>
