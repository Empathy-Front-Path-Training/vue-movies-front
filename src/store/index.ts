import Vue from "vue";
import Vuex from "vuex";
import { MovieInterface } from "@/interfaces/movieInterface";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [] as MovieInterface[],
    selectedMovie: {} as MovieInterface,
    selectedMoviePoster: "" as string,
    selectedMovieId: "" as string,
  },
  getters: {
    getSelectedMovie: (state) => {
      return [state.selectedMovie, state.selectedMoviePoster];
    },
  },
  mutations: {
    setMovies(state, movies: MovieInterface[]) {
      state.movies = movies;
    },
    setPoster(state, poster: string) {
      state.selectedMoviePoster = poster;
    },
    setSelectedMovie(state, movie: MovieInterface) {
      state.selectedMovie = movie;
    },
  },
  actions: {
    setMovies(context, movies: MovieInterface[]) {
      context.commit("setMovies", movies);
    },
    unselectMovie(context) {
      context.commit("setSelectedMovie", {});
      context.commit("setPoster", "");
    },
    async fetchPoster(context, movieId) {
      let poster: string;
      try {
        poster = await axios
          .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=a5f8e3c5")
          .then((response) => {
            return response.data.Poster;
          });
        // poster = response.data.Poster;
      } catch (e) {
        console.log(
          "There has been an error and the poster could not be fetched"
        );
        poster = require("@/assets/stand-by.jpg");
      }
      context.commit("setPoster", poster);
    },

    async fetchSelectedMovie(context, selectedMovieId: string) {
      await context.dispatch("unselectMovie");
      try {
        const response = await axios.get(
          "http://localhost:4000/movies/" + selectedMovieId
        );
        const movie = await response.data;
        context.commit("setSelectedMovie", movie);
      } catch (e) {
        alert(
          "There has been an error and the movie could not be fetched, please try again later."
        );
      }
    },
  },
  modules: {},
});
