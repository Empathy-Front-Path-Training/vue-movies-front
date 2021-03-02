<template>
  <div class="home">
    <img alt="MoVue logo" id="logo" src="../../assets/movue-transparent.png" />
    <div class="even-space">
      <MoviesListing v-on:showDetails="showMovieDetails($event)" />
      <MoviesDetails :movieId="movieId" />
    </div>
  </div>
</template>

<style src="./style.scss" lang="scss"></style>

<script>
// @ is an alias to /src
import MoviesListing from "@/components/MoviesListing/MoviesListing.vue";
import MoviesDetails from "@/components/MovieDetails/MoviesDetails";

export default {
  name: "Home",
  components: {
    MoviesDetails,
    MoviesListing,
  },
  data() {
    return {
      movieId: "",
    };
  },
  methods: {
    showMovieDetails(id) {
      this.movieId = id;
    },
  },
};
</script>
