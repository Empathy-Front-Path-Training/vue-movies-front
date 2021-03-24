<template>
  <li class="movie-item" @click="selectMovie">{{ movie.Title }}</li>
</template>

<script lang="ts">
import Vue from "vue";
import { MovieMockInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "MovieItem",
  props: {
    movie: MovieMockInterface,
  },
  methods: {
    selectMovie() {
      this.$emit("select-movie", this.movie.imdbID);
    },
  },
});
</script>

<style src="./style.scss" scoped lang="scss"></style>
