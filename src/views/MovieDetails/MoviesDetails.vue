<template>
  <transition name="fade">
    <section v-if="moviePoster !== ''" id="movie-details-panel">
      <h2 class="movie-title" data-test="details-title">
        {{ movie.title }}
      </h2>
      <section v-show="id !== ''" :key="id">
        <img :src="moviePoster" alt="" />

        <h3 data-test="details-rating">Rating: {{ movie.averageRating }}</h3>
        <h3 data-test="details-year">Year of release: {{ movie.startYear }}</h3>
        <h4 data-test="details-type">Type: {{ movie.type }}</h4>
        <section class="tag-section">
          <p v-for="genre in movie.genres" :key="genre" class="tag">
            {{ genre }}
          </p>
        </section>
      </section>
    </section>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "MoviesDetails",
  data() {
    return {
      id: "" as MovieInterface["id"],
    };
  },
  computed: {
    movie(): MovieInterface {
      return this.$store.state.selectedMovie;
    },
    moviePoster(): string {
      return this.$store.state.selectedMoviePoster;
    },
  },
  beforeMount() {
    this.id = this.$route.params.id;
    this.fetchMovieDetails();
  },

  methods: {
    fetchMovieDetails() {
      this.$store.dispatch("fetchSelectedMovie", this.id);
      this.$store.dispatch("fetchPoster", this.id);
    },
  },
  beforeRouteUpdate(to) {
    this.id = to.params.id;
    this.fetchMovieDetails();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
