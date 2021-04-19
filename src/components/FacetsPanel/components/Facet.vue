<template>
  <section class="facet-item">
    <label :for="facetInfo.name" class="facet-label">
      {{ facetInfo.name }} ({{ facetInfo.itemCount }})
    </label>
    <input
      :id="facetInfo.name"
      v-model="facetInfo.selected"
      class="facet-checkbox"
      type="checkbox"
      @input="updateFacet"
    />
  </section>
</template>

<script lang="ts">
import { FacetInterface } from "@/interfaces/Facets";
import Vue from "vue";

export default Vue.extend({
  name: "Facet",
  props: {
    facetInfo: {
      type: Object as () => FacetInterface,
      default: {},
    },
  },
  methods: {
    updateFacet(event: Event) {
      if (event.target.checked) {
        this.facetInfo.selected = true;
        this.$store.dispatch("addFacet", this.facetInfo);
      } else {
        this.facetInfo.selected = false;
        this.$store.dispatch("removeFacet", this.facetInfo);
      }
      this.$store.dispatch("searchMovies");
    },
  },
});
</script>

<style src="./style.scss" lang="scss" scoped></style>
