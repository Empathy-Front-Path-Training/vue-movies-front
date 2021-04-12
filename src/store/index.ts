import Vue from "vue";
import Vuex from "vuex";
import { MovieInterface } from "@/interfaces/movieInterface";
import axios, { CancelToken, CancelTokenSource } from "axios";
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
    searchText: "" as string,
    axiosCancel: {} as CancelTokenSource | undefined,
  },
  getters: {
    getSelectedMovie: (state) => {
      return [state.selectedMovie, state.selectedMoviePoster];
    },
    getFacetsRouteParams: (state) => {
      return state.selectedFacets.reduce(
        (route: string, facetParam: FacetInterface) => {
          route += "&filter=" + facetParam.type + ":" + facetParam.name;
          return route;
        },
        ""
      );
    },
  },
  mutations: {
    setMovies(state, movies: MovieInterface[] | MovieInterface) {
      if (Array.isArray(movies)) state.movies = movies;
      else {
        state.movies = [];
        state.movies.push(movies);
      }
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
    clearFacets(state) {
      state.selectedFacets.forEach((facet) => (facet.selected = false));
      state.selectedFacets = [];
    },
    setSearchText(state, searchText: string) {
      state.searchText = searchText;
    },
    setAxiosCancel(state, axiosCancel: CancelTokenSource | undefined) {
      state.axiosCancel = axiosCancel;
    },
  },
  actions: {
    clearFacets({ commit }) {
      commit("clearFacets");
    },
    setAxiosCancel({ commit }, axiosCancel: CancelTokenSource | undefined) {
      commit("setAxiosCancel", axiosCancel);
    },
    setSearchText({ commit }, searchText: string) {
      commit("setSearchText", searchText);
    },
    setMovies(context, movies: MovieInterface[] | MovieInterface) {
      context.commit("setMovies", movies);
    },
    unselectMovie(context) {
      context.commit("setSelectedMovie", {});
      context.commit("setPoster", "");
    },
    async setFacetGenres({ state, dispatch, commit }, genres) {
      const genreFacets = await dispatch("createFacetsArray", {
        facetItem: genres,
        facetType: "genres",
      });

      const facets = await dispatch("setFacetArray", genreFacets);

      commit("setFacetGenres", facets);
    },

    async setFacetTypes({ state, dispatch, commit }, types) {
      const typeFacets = await dispatch("createFacetsArray", {
        facetItem: types,
        facetType: "type",
      });

      const facets = await dispatch("setFacetArray", typeFacets);

      commit("setFacetTypes", facets);
    },
    async setFacetDecades({ state, dispatch, commit }, decades) {
      const decadeFacets = await dispatch("createFacetsArray", {
        facetItem: decades,
        facetType: "date",
      });

      const facets = await dispatch("setFacetArray", decadeFacets);
      commit("setFacetDecades", facets);
    },

    setFacetArray({ state }, retrievedFacets) {
      const array: FacetInterface[] = [];
      retrievedFacets.forEach((retrievedFacet: FacetInterface) => {
        const usedFacet = state.selectedFacets.find(
          (oldFacet: FacetInterface) =>
            oldFacet.name == retrievedFacet.name && oldFacet.selected
        );

        if (usedFacet) array.push(usedFacet);
        else array.push(retrievedFacet);
      });
      return array;
    },

    searchMovies({ getters, dispatch, state }) {
      if (state.searchText) {
        state.axiosCancel = axios.CancelToken.source();
        const completeQuery = state.searchText + getters.getFacetsRouteParams;
        console.log(completeQuery);
        axios
          .get("http://localhost:8080/search?query=" + completeQuery, {
            cancelToken: state.axiosCancel.token,
          })
          .then((response) => {
            dispatch("setMovies", response.data.items);
            dispatch("setFacetGenres", response.data.aggregations[0].genres);
            dispatch("setFacetTypes", response.data.aggregations[1].types);
            dispatch("setFacetDecades", response.data.aggregations[2].decades);
          });
      } else {
        dispatch("unselectMovie");
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
            selected: false,
          });
        }
      }

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
