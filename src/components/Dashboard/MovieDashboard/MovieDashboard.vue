<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import localforage from 'localforage';
import trackedMoviestStore from '../../../stores/TrackedMoviesStore';

@Component
export default class MovieDashboard extends Vue {
  mounted() {
    this.populateTrackedMoviesState();
  }

  populateTrackedMoviesState() {
    localforage.getItem('trackedMovies').then((movieList) => {
      const populatedList = movieList || [];
      trackedMoviestStore.commit('populateTrackedMovies', populatedList);
    });
  }

  get trackedMovies() {
    return trackedMoviestStore.state.trackedMovieList;
  }
}
</script>

<style scoped lang="scss">
</style>

<template>
  <div>{{ trackedMovies }}</div>
</template>
