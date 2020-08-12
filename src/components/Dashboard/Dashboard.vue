<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MovieOverview from './MovieOverview/MovieOverview.vue';

@Component({
  components: {
    MovieOverview,
  },
})
export default class Dashboard extends Vue {}
</script>

<style scoped lang="scss">
</style>

<template>
  <MovieOverview />
</template>
