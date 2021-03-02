<template>
  <li v-on:click="selectMovie">{{ title }}</li>
</template>

<script>
export default {
  name: "MovieItem",
  props: {
    title: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  methods: {
    selectMovie() {
      this.$emit("selectMovie", this.id);
    },
  },
};
</script>
