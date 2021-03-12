<template>
  <transition name="fade">
    <section v-show="movieInfo.id !== undefined" id="movie-details-panel">
      <h2 id="details-title">Details of the movie:</h2>
      <transition name="fade">
        <section v-show="movieInfo.id !== undefined" :key="movieInfo.id">
          <img :src="moviePoster" alt="mock image for the poster" />
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
// http://www.omdbapi.com/?i=[id]&apikey=a5f8e3c5
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
      moviePoster: "",
    };
  },
  methods: {
    showSelectedMovie(selectedMovieId) {
      if (selectedMovieId !== "") {
        this.fetchSelectedMovie(selectedMovieId).then(
          (movie) => (this.movie = movie)
        );
        this.fetchMoviePosterFromOMdb(selectedMovieId).then(
          (poster) => (this.moviePoster = poster)
        );
      }
    },
    async fetchMoviePosterFromOMdb(selectedMovieId) {
      let poster = "";
      try {
        let response = await fetch(
          "http://www.omdbapi.com/?i=" + selectedMovieId + "&apikey=a5f8e3c5"
        );
        let movieJson = await response.json();
        poster = movieJson.Poster;
      } catch (e) {
        console.log(
          "There has been an error and the poster could not be fetched"
        );
        poster = require("@/assets/stand-by.jpg");
      }
      return poster;
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
