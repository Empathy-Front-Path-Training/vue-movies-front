<template>
  <li class="movie-item" @click="selectMovie">{{ movie.Title }}</li>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    movie: {
      type: Object
    }
  },
  methods: {
    selectMovie() {
      this.$emit("select-movie", this.movie.imdbID);
    }
  }
};
</script>

<style src="./style.scss" scoped lang="scss"></style>
