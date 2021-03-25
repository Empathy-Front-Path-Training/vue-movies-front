<template>
  <transition name="fade">
    <section v-show="movieList.length" id="movie-list-section">
      <h2>Search results:</h2>
      <ul id="movie-list">
        <MovieItem
          v-for="movie in movieList"
          :key="movie.id"
          :movie="movie"
          @select-movie="showDetails($event)"
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

  methods: {
    showDetails(movieId: string) {
      this.$emit("show-details", movieId);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
