<template>
  <li v-on:click="selectMovie">{{ movie.title }}</li>
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
      this.$emit("select-movie", this.movie);
    },
  },
};
</script>
