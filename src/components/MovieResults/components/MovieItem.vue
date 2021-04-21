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
  computed: {
    thumbnail() {
      return this.$store.dispatch("fetchPoster", this.movie.id);
    },
  },
  methods: {
    selectMovie() {
      this.$router.push({
        name: "Movie Details",
        params: { id: this.movie.id as string },
      });
    },
  },
});
</script>

<style src="./style.scss" scoped lang="scss"></style>
