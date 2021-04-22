<template>
  <transition name="fade">
    <section v-if="$store.state.movies.length" id="movie-list-section">
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
import MovieItem from "@/components/MovieResults/components/MovieItem.vue";
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "MovieResults",
  components: { MovieItem },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
