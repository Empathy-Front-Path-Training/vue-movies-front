<template>
  <ul>
    <li>{{ movieId }}</li>
  </ul>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>

<script>
export default {
  name: "MoviesDetails",
  props: {
    movieId: {
      type: String,
    },
  },
};
</script>
