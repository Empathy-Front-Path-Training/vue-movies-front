<template>
  <section id="facets-component">
    <section id="genre-facets" class="facet-panel">
      <h2>Genres</h2>
      <ul>
        <li v-for="genre in $store.state.facetGenres" :key="genre.name">
          <Facet :facet-info="genre"></Facet>
        </li>
      </ul>
      <h2>Types</h2>
      <ul>
        <li v-for="type in $store.state.facetTypes" :key="type.name">
          <Facet :facet-info="type"></Facet>
        </li>
      </ul>
      <h2>Decades</h2>
      <ul>
        <li v-for="decade in $store.state.facetDecades" :key="decade.name">
          <Facet :facet-info="decade"></Facet>
        </li>
      </ul>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Facet from "@/components/FacetsPanel/components/Facet.vue";

export default Vue.extend({
  name: "FacetsPanel",
  components: { Facet },
});
</script>

<style scoped></style>
