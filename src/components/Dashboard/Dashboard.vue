<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import MovieOverview from './MovieOverview/MovieOverview.vue';

export default defineComponent({
  name: 'Dashboard',
  components: {
    MovieOverview,
  },
});
</script>

<style scoped lang="scss">
</style>

<template>
  <MovieOverview />
</template>
