<template>
  <label class="facet-label">
    {{ facetInfo.name }} ({{ facetInfo.itemCount }})
    <input
      :id="facetInfo.name"
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
  },
  methods: {
    updateFacet(event: boolean) {
      console.log(event.target.checked);
      if (event.target.checked)
        this.$store.dispatch("addFacet", this.facetInfo);
      else this.$store.dispatch("removeFacet", this.facetInfo);
      console.log(this.$store.getters.getFacetsRouteParams);
    },
  },
};
</script>

<style scoped></style>
