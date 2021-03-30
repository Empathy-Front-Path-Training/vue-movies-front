<template>
  <li class="movie-item" @click="selectMovie">{{ movie.title }}</li>
</template>

<script lang="ts">
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "MovieItem",
  props: {
    movie: {
      type: Object as () => MovieInterface,
      default: {},
    },
  },
  methods: {
    selectMovie() {
      this.$store.dispatch("fetchSelectedMovie", this.movie.id);
      this.$store.dispatch("fetchPoster", this.movie.id);
    },
  },
});
</script>

<style src="./style.scss" scoped lang="scss"></style>
