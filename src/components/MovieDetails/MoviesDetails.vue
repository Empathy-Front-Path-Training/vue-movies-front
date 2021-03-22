<template>
  <transition name="fade">
    <section v-show="movieId !== ''" id="movie-details-panel">
      <h2 id="details-title">Details of the movie:</h2>
      <transition name="fade">
        <section v-show="movieId !== undefined" :key="movieId">
          <img :src="moviePoster" alt="mock image for the poster" />
          <h2 class="movie-title" data-test="details-title">
            {{ movie.title }}
          </h2>
          <h3 data-test="details-rating">Rating: {{ movie.averageRating }}</h3>
          <h3 data-test="details-year">
            Year of release: {{ movie.startYear }}
          </h3>
          <h4 data-test="details-type">Type: {{ movie.type }}</h4>
          <section class="tag-section">
            <p v-for="genre in movie.genres" :key="genre" class="tag">
              {{ genre }}
            </p>
          </section>
        </section>
      </transition>
    </section>
  </transition>
</template>

<script>
// http://www.omdbapi.com/?i=[id]&apikey=a5f8e3c5
export default {
  name: "MoviesDetails",
  props: {
    movieId: {
      type: String
    }
  },
  data() {
    return {
      movie: {},
      moviePoster: ""
    };
  },
  methods: {
    showSelectedMovie() {
      let movie,
        poster = "";
      console.log(this.movieId);
      if (this.movieId !== "") {
        this.fetchSelectedMovie(this.movieId).then(
          movie => (this.movie = movie)
        );
        this.fetchMoviePosterFromOMdb(this.movieId).then(
          poster => (this.moviePoster = poster)
        );

        return { movie, poster };
      }
    },
    async fetchMoviePosterFromOMdb(selectedMovieId) {
      let poster = "";
      try {
        let response = await fetch(
          "http://www.omdbapi.com/?i=" + selectedMovieId + "&apikey=a5f8e3c5"
        );
        let movieJson = await response.json();
        poster = movieJson.Poster;
      } catch (e) {
        console.log(
          "There has been an error and the poster could not be fetched"
        );
        poster = require("@/assets/stand-by.jpg");
      }
      return poster;
    },
    async fetchSelectedMovie(selectedMovieId) {
      try {
        let response = await fetch(
          "http://localhost:3000/movies/" + selectedMovieId
        );
        return await response.json();
      } catch (e) {
        alert(
          "There has been an error and the movie could not be fetched, please try again later."
        );
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style src="./style.scss" scoped lang="scss"></style>
