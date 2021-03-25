<template>
  <section class="movie-panel">
    <section id="movie-search">
      <label for="search-box-movie"></label>
      <input
        id="search-box-movie"
        v-model="searchText"
        placeholder="Search your movie"
        @input="debounceSearch"
      />
    </section>
    <MoviesListing
      :movie-list="movieList"
      @show-details="showMovieDetails($event)"
    />
    <MoviesDetails
      ref="movieDetails"
      :movie="movie"
      :movie-poster="moviePoster"
    />
  </section>
</template>

<script lang="ts">
import MoviesListing from "@/components/MoviesListing/MoviesListing.vue";
import MoviesDetails from "@/components/MovieDetails/MoviesDetails.vue";
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";
import _debounce from "lodash.debounce";

export default Vue.extend({
  name: "MoviePanel",
  components: {
    MoviesDetails,
    MoviesListing,
  },
  data() {
    return {
      movie: {} as MovieInterface,
      moviePoster: "" as string,
      searchText: "" as string,
      movieList: [] as MovieInterface[],
    };
  },

  methods: {
    debounceSearch() {
      return _debounce(this.searchMovies, 100);
    },
    searchMovies() {
      let fetchedMovieList: [] = [];
      if (this.searchText) {
        fetch(
          "http://localhost:4000/movies?title_like=" + this.searchText
        ).then((response) =>
          response.json().then((response) => (fetchedMovieList = response))
        );
      }

      this.movieList = fetchedMovieList;
    },
    showMovieDetails(movieId: string) {
      if (movieId !== "") {
        this.fetchSelectedMovie(movieId).then((movie) => (this.movie = movie));
        this.fetchMoviePosterFromOMdb(movieId).then(
          (poster) => (this.moviePoster = poster)
        );
      }
    },
    async fetchMoviePosterFromOMdb(selectedMovieId: string) {
      let poster: string;
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
    async fetchSelectedMovie(selectedMovieId: string) {
      try {
        let response = await fetch(
          "http://localhost:4000/movies/" + selectedMovieId
        );
        return await response.json();
      } catch (e) {
        alert(
          "There has been an error and the movie could not be fetched, please try again later."
        );
      }
    },
  },
});
</script>

<style src="./style.scss" lang="scss"></style>
