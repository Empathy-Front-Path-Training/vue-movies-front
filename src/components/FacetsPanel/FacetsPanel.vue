<template>
  <section v-show="thereAreFacets">
    <section id="genre-facets" class="facet-panel">
      <section class="facet-header">
        <h2>Genres</h2>
      </section>
      <section v-show="showGenreFacets" class="facet-list-container">
        <ul class="facet-list">
          <li v-for="genre in $store.state.facetGenres" :key="genre.name">
            <Facet :facet-info="genre"></Facet>
          </li>
        </ul>
      </section>
    </section>
    <section id="type-facets" class="facet-panel">
      <section class="facet-header">
        <h2>Types</h2>
      </section>
      <section v-show="showTypeFacets" class="facet-list-container">
        <ul class="facet-list">
          <li v-for="type in $store.state.facetTypes" :key="type.name">
            <Facet :facet-info="type"></Facet>
          </li>
        </ul>
      </section>
    </section>
    <section id="decade-facets" class="facet-panel">
      <section class="facet-header">
        <h2>Decades</h2>
      </section>
      <section v-if="showDecadeFacets" class="facet-list-container">
        <ul class="facet-list">
          <li v-for="decade in $store.state.facetDecades" :key="decade.name">
            <Facet :facet-info="decade"></Facet>
          </li>
        </ul>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Facet from "@/components/FacetsPanel/components/Facet.vue";

export default Vue.extend({
  name: "FacetsPanel",
  components: { Facet },
  data() {
    return {
      showGenreFacets: true as boolean,
      showTypeFacets: true as boolean,
      showDecadeFacets: true as boolean,
    };
  },
  computed: {
    thereAreFacets() {
      return (
        this.$store.state.facetGenres.length ||
        this.$store.state.facetTypes.length ||
        this.$store.state.facetDecades.length
      );
    },
  },
});
</script>

<style scoped src="./style.scss" lang="scss"></style>
