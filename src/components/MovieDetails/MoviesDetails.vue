<template>
  <transition name="fade">
    <section v-show="movieInfo.id !== undefined" id="movie-details-panel">
      <h2>Details of the movie:</h2>
      <img alt="mock image for the poster" :src="movieInfo.image" />
      <transition name="fade">
        <section v-show="movieInfo.id !== undefined" :key="movieInfo.id">
          <h2 class="movie-title">{{ movie.title }}</h2>
          <h3>Rating: {{ movie.averageRating }}</h3>
          <h3>Year of release: {{ movie.startYear }}</h3>
          <h4>Type: {{ movie.type }}</h4>
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

<script>
export default {
  name: "MoviesDetails",
  props: {
    movieInfo: {
      type: Object,
    },
  },
  data() {
    return {
      movie: {},
    };
  },
  methods: {
    showSelectedMovie(selectedMovieId) {
      if (selectedMovieId !== "") {
        this.fetchSelectedMovie(selectedMovieId).then((movie) => {
          this.movie = movie;
        });
      }
    },
    async fetchSelectedMovie(selectedMovieId) {
      try {
        let response = await fetch(
          "http://localhost:3000/movies/" + selectedMovieId
        );
        return await response.json();
      } catch (e) {
        alert(
          "There has been an error and the movie could not be fetched, please try again later."
        );
      }
    },
  },
  watch: {
    movieInfo(newSelectedMovieInfo) {
      this.showSelectedMovie(newSelectedMovieInfo.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
