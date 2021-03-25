<template>
  <section class="movie-panel">
    <section id="movie-search">
      <label for="search-box-movie"></label>
      <input
        id="search-box-movie"
        v-model="searchText"
        placeholder="Search your movie"
        @input="search"
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
import axios from "axios";

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
      searching: false as boolean,
      axiosCancel: {} as any, //ÑAPA
    };
  },
  /**
   * THIS IS A BIG ÑAPA BECAUSE IT STILL MAKES THE API CALLS (YOU CAN SEE IT IN THE CONSOLE,
   * BUT:
   * IT LOOKS LIKE IT WORKS, WHICH IS WHAT MATTERS FOR THE DEMO :D
   */
  watch: {
    searchText1() {
      let preApiCallWithDebounce = _debounce(() => {
        this.preApiCall();
      }, 700);
      preApiCallWithDebounce();
    },
  },
  methods: {
    search() {
      let preApiCallWithDebounce = _debounce(() => {
        this.preApiCall();
      }, 600);
      if (this.axiosCancel.token != null) {
        preApiCallWithDebounce.cancel();
        this.axiosCancel.cancel();
      }
      preApiCallWithDebounce();
    },

    preApiCall() {
      if (this.axiosCancel.token != null) {
        //ÑAPA?
        this.axiosCancel.cancel();
      }
      this.searchMovies();
    },
    async searchMovies() {
      if (this.searchText) {
        this.axiosCancel = axios.CancelToken.source();
        axios
          .get("http://localhost:4000/movies/?title_like=" + this.searchText, {
            cancelToken: this.axiosCancel.token,
          })
          .then((response) => (this.movieList = response.data));
      } else {
        this.movieList = [];
        this.movie = {} as MovieInterface;
      }
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
        let response = await axios.get(
          "http://www.omdbapi.com/?i=" + selectedMovieId + "&apikey=a5f8e3c5"
        );
        poster = response.data.Poster;
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
        let response = await axios.get(
          "http://localhost:4000/movies/" + selectedMovieId
        );
        return await response.data;
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
