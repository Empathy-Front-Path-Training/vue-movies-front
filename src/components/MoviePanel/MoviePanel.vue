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
import axios, { CancelTokenSource, CancelToken } from "axios";

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
      axiosCancel: {} as CancelToken,
    };
  },

  methods: {
    async debounceSearch() {
      console.log("Debounced");
      let search = _debounce(() => this.searchMovies(), 1000);

      search();
      this.searching = true;
    },
    searchMovies() {
      let fetchedMovieList: [] = [];
      if (!this.axiosCancel) this.axiosCancel.cancel();
      if (this.searchText) {
        axios
          .get("http://localhost:4000/movies/?title_like=" + this.searchText, {
            cancelToken: new CancelToken(
              (c: CancelToken) => (this.axiosCancel = c)
            ),
          })
          .then((response) => (fetchedMovieList = response.data));
      }

      this.movieList = fetchedMovieList;
      this.searching = false;
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
