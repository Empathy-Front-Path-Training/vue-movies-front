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
      this.$emit("select-movie", this.movie.id);
    },
  },
});
</script>

<style src="./style.scss" scoped lang="scss"></style>
