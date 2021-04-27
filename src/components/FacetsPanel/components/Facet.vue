<template>
  <section class="facet-item" :class="computedSelectionClass">
    <label :for="facetInfo.name" class="facet-label">
      <input
        :id="facetInfo.name"
        v-model="facetInfo.selected"
        class="facet-checkbox"
        type="checkbox"
        @input="updateFacet"
      />
      {{ capitalizedFacet() }} ({{ facetInfo.itemCount }})
    </label>
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
  computed: {
    computedSelectionClass() {
      return this.facetInfo.selected ? "selected" : "unselected";
    },
  },
  methods: {
    capitalizedFacet() {
      return (
        this.facetInfo.name.charAt(0).toUpperCase() +
        this.facetInfo.name.slice(1)
      );
    },
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
