<template>
  <section>
    <ul>
      <li v-for="genre in $store.state.facetGenres" :key="genre.name">
        <label
          >{{ genre.name }}
          <input :id="genre.name" type="checkbox" />
        </label>
      </li>
    </ul>
    <p>{{}}</p>
  </section>
</template>

<script>
import Vue from "vue";
import { MovieInterface } from "@/interfaces/movieInterface";

export default Vue.extend({
  name: "Facets",
  computed: {},
});
</script>

<style scoped></style>
