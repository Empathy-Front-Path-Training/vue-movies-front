<template>
  <!--Transition not working :D-->
  <transition v-bind:class="{ 'align-left': isShowingDetails }" name="displace">
    <section id="movie-list-section">
      <h2>List of movies</h2>
      <ul id="movie-list">
        <MovieItem
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          v-on:select-movie="showDetails($event)"
        >
        </MovieItem>
      </ul>
    </section>
  </transition>
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
      movies: searchResults.items,
      isShowingDetails: false,
    };
  },
  methods: {
    showDetails(movie) {
      this.$emit("show-details", movie);
      this.isShowingDetails = true;
    },
  },
};
</script>
