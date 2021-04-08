import Vue from "vue";
import Vuex from "vuex";
import { MovieInterface } from "@/interfaces/movieInterface";
import axios from "axios";
import { FacetInterface } from "@/interfaces/Facets";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    movies: [] as MovieInterface[],
    selectedMovie: {} as MovieInterface,
    selectedMoviePoster: "" as string,
    selectedMovieId: "" as string,
    facetGenres: [] as FacetInterface[],
    facetTypes: [] as FacetInterface[],
    facetDecades: [] as FacetInterface[],
    selectedFacets: [] as FacetInterface[],
  },
  getters: {
    getSelectedMovie: (state) => {
      return [state.selectedMovie, state.selectedMoviePoster];
    },
    getFacetsRouteParams: (state) => {
      return state.selectedFacets.reduce(
        (route: string, facetParam: FacetInterface) => {
          route += "&" + facetParam.type + "=" + facetParam.name;
          return route;
        },
        ""
      );
    },
  },
  mutations: {
    setMovies(state, movies: MovieInterface[]) {
      console.log(movies);
      state.movies = movies;
    },
    setPoster(state, poster: string) {
      state.selectedMoviePoster = poster;
    },
    setSelectedMovie(state, movie: MovieInterface) {
      state.selectedMovie = movie;
    },
    setFacetGenres(state, genres: FacetInterface[]) {
      state.facetGenres = genres;
    },
    setFacetTypes(state, types: FacetInterface[]) {
      state.facetTypes = types;
    },
    setFacetDecades(state, decades: FacetInterface[]) {
      state.facetDecades = decades;
    },
    addFacet(state, facetToAdd: FacetInterface) {
      state.selectedFacets.push(facetToAdd);
    },
    removeFacet(state, facetToRemove: FacetInterface) {
      const index = state.selectedFacets.findIndex(
        (facet) => facet.name == facetToRemove.name
      );
      state.selectedFacets.splice(index, 1);
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
    setFacetGenres(context, genres) {
      context
        .dispatch("createFacetsArray", {
          facetItem: genres,
          facetType: "genre",
        })
        .then((genreFacets) => context.commit("setFacetGenres", genreFacets));
    },
    setFacetTypes(context, types) {
      context
        .dispatch("createFacetsArray", { facetItem: types, facetType: "type" })
        .then((typeFacets) => context.commit("setFacetTypes", typeFacets));
    },
    setFacetDecades(context, decades) {
      context
        .dispatch("createFacetsArray", {
          facetItem: decades,
          facetType: "date",
        })
        .then((decadeFacets) =>
          context.commit("setFacetDecades", decadeFacets)
        );
    },
    async searchMovies({ commit, dispatch }, { searchText, axiosCancel }) {
      if (searchText) {
        axiosCancel = axios.CancelToken.source();
        const params = {
          query: searchText,
          type: "movie",
        };
        axios
          .get("http://localhost:8080/search?", {
            params,
            cancelToken: axiosCancel.token,
          })
          .then((response) => {
            dispatch("setMovies", response.data.items);
            dispatch("setFacetGenres", response.data.aggregations[0].genres);
            dispatch("setFacetTypes", response.data.aggregations[1].types);
            dispatch("setFacetDecades", response.data.aggregations[2].decades);
          });
      } else {
        await dispatch("unselectMovie");
      }
    },
    createFacetsArray(context, { facetItem, facetType }) {
      const facetArray: FacetInterface[] = [];
      for (const item in facetItem) {
        if (Object.prototype.hasOwnProperty.call(facetItem, item)) {
          facetArray.push({
            type: facetType,
            name: item,
            itemCount: facetItem[item],
          });
        }
      }
      console.log(facetArray);
      return facetArray;
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

    fetchSelectedMovie(
      { state, commit },
      selectedMovieId: MovieInterface["id"]
    ) {
      const tempMovie = state.movies.filter(
        (movie) => movie.id == selectedMovieId
      )[0];
      console.log(tempMovie);
      commit("setSelectedMovie", tempMovie);
    },
    addFacet(context, facet: FacetInterface) {
      context.commit("addFacet", facet);
    },
    removeFacet(context, facet: FacetInterface) {
      context.commit("removeFacet", facet);
    },
  },
  modules: {},
});
