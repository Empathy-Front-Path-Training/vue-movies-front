<template>
  <transition name="fade">
    <section v-show="$store.state.movies.length" id="movie-list-section">
      <h2>Search results:</h2>
      <ul id="movie-list">
        <MovieItem
          v-for="movie in $store.state.movies"
          :key="movie.id"
          :movie="movie"
        />
      </ul>
    </section>
  </transition>
</template>

<script lang="ts">
import MovieItem from "@/components/MoviesListing/components/MovieItem.vue";
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "MoviesListing",
  components: { MovieItem },
  props: {
    movieList: {
      type: Array as () => MovieInterface[],
      default: [],
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
