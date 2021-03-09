<template>
  <transition name="fade-panel">
    <section v-show="movieInfo.id !== ''" id="movie-details-panel">
      <h2>Details of the movie</h2>
      <transition name="fade-details">
        <section v-show="showPanel" id="movie-details">
          <img alt="mock image for the poster" :src="movieInfo.image" />
          <h2>{{ movie.title }}</h2>
          <h3>Rating: {{ movie.averageRating }}</h3>
          <h3>Year of release: {{ movie.startYear }}</h3>
          <h4>Type: {{ movie.type }}</h4>
          <h4>Genres: {{ listGenres() }}</h4>
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
      showPanel: false,
    };
  },
  methods: {
    listGenres() {
      let genres = "";
      if (this.movie.id !== undefined) {
        genres = this.movie.genres.reduce((gen, genre) => gen + ", " + genre);
      }
      return genres;
    },
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
    movieInfo(selectedMovieInfo) {
      this.showSelectedMovie(selectedMovieInfo.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
