<template>
  <li class="movie-item" @click="selectMovie">
    <img class="thumbnail" :src="thumbnail" :alt="altTextPoster" />
    <p>{{ movie.title }}</p>
  </li>
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
  data() {
    return {
      thumbnail: "" as string,
    };
  },
  computed: {
    altTextPoster() {
      return "Poster for the movie " + this.movie.title;
    },
  },
  async beforeMount() {
    await this.setPoster();
  },
  methods: {
    async setPoster() {
      this.thumbnail = await this.$store.dispatch("fetchPoster", this.movie.id);
    },
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
