<template>
  <label class="facet-label">
    {{ facetInfo.name }} ({{ facetInfo.itemCount }})
    <input
      :id="facetInfo.name"
      v-model="facetInfo.selected"
      class="facet-checkbox"
      type="checkbox"
      @input="updateFacet"
    />
  </label>
</template>

<script lang="ts">
import { FacetInterface } from "@/interfaces/Facets";

export default {
  name: "Facet",
  props: {
    facetInfo: {
      type: Object as () => FacetInterface,
      default: {},
    },
    clearFacets: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    clearFacets() {
      //if (this.clearFacets) this.facetInfo.selected = false;
    },
  },
  methods: {
    updateFacet(event: boolean) {
      console.log(event.target.checked);

      if (event.target.checked) {
        this.facetInfo.selected = true;
        this.$store.dispatch("addFacet", this.facetInfo);
      } else {
        this.facetInfo.selected = false;
        this.$store.dispatch("removeFacet", this.facetInfo);
      }
      this.$store.dispatch("searchMovies");
      console.log("invoking them movies");
    },
  },
};
</script>

<style scoped></style>
