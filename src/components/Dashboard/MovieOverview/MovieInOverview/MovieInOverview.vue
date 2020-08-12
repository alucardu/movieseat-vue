<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RemoveMovieFromDashboard from './RemoveMovieFromDashboard/RemoveMovieFromDashboard.vue';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

@Component({
  components: {
    RemoveMovieFromDashboard,
  },
})
export default class MovieInOverview extends Vue {
  @Prop() readonly movie!: Movie;

  hover = false;

  imagePath = 'https://image.tmdb.org/t/p/w185/';
}
</script>

<style scoped lang="scss">
  .movieInOverviewContainer {
    position: relative;
  }
</style>

<template>
  <div
      class='movieInOverviewContainer'
      v-on:mouseover='hover = true'
      v-on:mouseleave='hover = false'
    >
    <img :src="imagePath + movie.poster_path" />
    <RemoveMovieFromDashboard v-if='hover' :movie=movie />
  </div>
</template>
