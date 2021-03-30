<template>
  <transition name="fade">
    <section v-show="mId !== undefined" id="movie-details-panel">
      <h2 id="details-title">Details of the movie:</h2>
      <transition name="fade">
        <section v-show="mId !== undefined" :key="mId">
          <img :src="mPoster" alt="" />
          <h2 class="movie-title" data-test="details-title">
            {{ mTitle }}
          </h2>
          <h3 data-test="details-rating">Rating: {{ mRating }}</h3>
          <h3 data-test="details-year">Year of release: {{ mReleaseYear }}</h3>
          <h4 data-test="details-type">Type: {{ mType }}</h4>
          <section class="tag-section">
            <p v-for="genre in mGenres" :key="genre" class="tag">
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
import { mapState, Store } from "vuex";

export default Vue.extend({
  name: "MoviesDetails",
  computed: mapState({
    mId: (state) => state.selectedMovie.id,
    mTitle: (state) => state.selectedMovie.title,
    mType: (state) => state.selectedMovie.type,
    mReleaseYear: (state) => state.selectedMovie.startYear,
    mRating: (state) => state.selectedMovie.averageRating,
    mGenres: (state) => state.selectedMovie.genres,
    mPoster: (state) => state.selectedMoviePoster,
  }),
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
