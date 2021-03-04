<template>
  <transition name="fade">
    <section v-show="movie.id !== undefined" id="movie-details">
      <h2>Details of the movie</h2>
      <section>
        <img alt="mock image for the poster" src="../../assets/stand-by.jpg" />
        <h2>{{ movie.title }}</h2>
        <h3>Rating: {{ movie.averageRating }}</h3>
        <h3>Year of release: {{ movie.startYear }}</h3>
        <h4>Type: {{ movie.type }}</h4>
        <h4>Genres: {{ listGenres() }}</h4>
      </section>
    </section>
  </transition>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>

<script>
export default {
  name: "MoviesDetails",
  props: {
    movie: {
      type: Object,
    },
  },
  methods: {
    listGenres() {
      let genres = "";
      if (this.movie.id !== undefined) {
        genres = this.movie.genres.reduce((gen, genre) => gen + ", " + genre);
      }
      return genres;
    },
  },
};
</script>
