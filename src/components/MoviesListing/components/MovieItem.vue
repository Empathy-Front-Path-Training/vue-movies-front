<template>
  <li class="movie-item" v-on:click="selectMovie">{{ movie.title }}</li>
</template>
<style src="./style.scss" scoped lang="scss"></style>
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
      this.$emit("select-movie", this.movie);
    },
  },
};
</script>
