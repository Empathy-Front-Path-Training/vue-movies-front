<template>
  <transition name="fade">
    <section v-show="movie.id !== undefined" id="movie-details-panel">
      <h2 id="details-title">Details of the movie:</h2>
      <transition name="fade">
        <section v-show="movie.id !== undefined" :key="movie.id">
          <img :src="moviePoster" alt="mock image for the poster" />
          <h2 class="movie-title" data-test="details-title">
            {{ movie.title }}
          </h2>
          <h3 data-test="details-rating">Rating: {{ movie.averageRating }}</h3>
          <h3 data-test="details-year">
            Year of release: {{ movie.startYear }}
          </h3>
          <h4 data-test="details-type">Type: {{ movie.type }}</h4>
          <section class="tag-section">
            <p v-for="genre in movie.genres" :key="genre" class="tag">
              {{ genre }}
            </p>
          </section>
        </section>
      </transition>
    </section>
  </transition>
</template>

<script lang="ts">
// http://www.omdbapi.com/?i=[id]&apikey=a5f8e3c5
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "MoviesDetails",
  props: {
    movie: {
      type: MovieInterface,
      default: function () {
        return { movie: {} as MovieInterface };
      },
    },
    moviePoster: {
      type: String,
      default: "",
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
