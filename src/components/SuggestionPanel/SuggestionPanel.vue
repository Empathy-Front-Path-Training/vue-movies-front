<template>
  <section v-show="$store.state.suggestions.length">
    <h3 id="suggestion-title">Did you mean:</h3>
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

<style src="./style.scss" lang="scss"></style>
