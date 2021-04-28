<template>
  <section v-if="$store.state.suggestions.length">
    <ul id="suggestion-list">
      <Suggestion
        v-for="suggestion in $store.state.suggestions"
        :key="suggestion.text"
        :suggestion="suggestion"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Suggestion from "@/components/SuggestionPanel/component/Suggestion.vue";
export default Vue.extend({
  name: "SuggestionPanel",
  components: { Suggestion },
});
</script>

<style scoped></style>
