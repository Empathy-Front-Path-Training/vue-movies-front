<template>
  <label
    >{{ facetInfo.name }}
    <input :id="facetInfo.name" type="checkbox" />
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
};
</script>

<style scoped></style>
