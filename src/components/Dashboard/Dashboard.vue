<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MovieDashboard from './MovieDashboard/MovieDashboard.vue';

@Component({
  components: {
    MovieDashboard,
  },
})
export default class Dashboard extends Vue {}
</script>

<style scoped lang="scss">
</style>

<template>
  <MovieDashboard />
</template>
