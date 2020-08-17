<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import RemoveMovieFromDashboard from './RemoveMovieFromDashboard/RemoveMovieFromDashboard.vue';
import MovieRating from './MovieRating/MovieRating.vue';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

@Component({
  components: {
    RemoveMovieFromDashboard,
    MovieRating,
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
    height: 100%;
    img {
      height: 100%;
      width: 100%;
    }
    .overlay {
      position: absolute;
      background: #000000b5;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      padding: 8px;
    }
  }
</style>

<template>
  <div
      class='movieInOverviewContainer'
      v-on:mouseover='hover = true'
      v-on:mouseleave='hover = false'
    >
    <img :src="imagePath + movie.poster_path" />
    <div class='overlay' v-if='hover'>
      <MovieRating :movie=movie />
      <RemoveMovieFromDashboard v-if='hover' :movie=movie />
    </div>
  </div>
</template>
