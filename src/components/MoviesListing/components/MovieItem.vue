<template>
  <li class="movie-item" v-on:click="selectMovie">{{ movie.Title }}</li>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object,
    },
  },
  methods: {
    selectMovie() {
      this.$emit("select-movie", {
        id: this.movie.imdbID,
        image: this.movie.Poster,
      });
    },
  },
};
</script>

<style src="./style.scss" scoped lang="scss"></style>
