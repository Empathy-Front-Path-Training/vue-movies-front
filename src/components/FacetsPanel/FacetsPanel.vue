<template>
  <section id="facets-component">
    <section id="genre-facets" class="facet-panel">
      <h2>Genres</h2>
      <ul>
        <li v-for="genre in $store.state.facetGenres" :key="genre.name">
          <Facet :facet-info="genre"></Facet>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import Vue from "vue";
import Facet from "@/components/FacetsPanel/components/Facet";

export default Vue.extend({
  name: "FacetsPanel",
  components: { Facet },
});
</script>

<style scoped></style>
