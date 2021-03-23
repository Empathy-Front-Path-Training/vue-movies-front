<template>
  <section class="movie-panel">
    <MoviesListing @show-details="showMovieDetails($event)" />
    <MoviesDetails
      ref="movieDetails"
      :movie="movie"
      :movie-poster="moviePoster"
    />
  </section>
</template>

<script>
import MoviesListing from "@/components/MoviesListing/MoviesListing.vue";
import MoviesDetails from "@/components/MovieDetails/MoviesDetails";
export default {
  name: "MoviePanel",
  components: {
    MoviesDetails,
    MoviesListing
  },
  data() {
    return {
      movie: {},
      moviePoster: ""
    };
  },
  methods: {
    showMovieDetails(movieId) {
      if (movieId !== "") {
        this.fetchSelectedMovie(movieId).then(movie => (this.movie = movie));
        this.fetchMoviePosterFromOMdb(movieId).then(
          poster => (this.moviePoster = poster)
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
    }
  }
};
</script>

<style src="./style.scss" lang="scss"></style>
