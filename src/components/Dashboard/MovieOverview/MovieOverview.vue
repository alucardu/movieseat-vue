<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import localforage from 'localforage';
import { chunk } from 'lodash';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';
import MovieInOverview from './MovieInOverview/MovieInOverview.vue';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

type SortingConfiguration = {
  sortType: string;
  ascOrder: boolean;
}

@Component({
  components: {
    MovieInOverview,
  },
})
export default class MovieOverview extends Vue {
  mounted() {
    localforage.getItem('sortingConfiguration').then((value) => {
      if (!value) localforage.setItem('sortingConfiguration', { sortType: 'Release date', ascOrder: true });
    });
    this.populateTrackedMoviesState();

    window.addEventListener('resize', this.MoviesInRows);
    return () => {
      window.removeEventListener('resize', this.MoviesInRows);
    };
  }

  numberOfMovies = 0;

  MoviesInRows() {
    this.numberOfMovies = Math.floor((window.innerWidth - 24) / 185);
    return chunk(TrackedMoviestStore.state.trackedMovieList, this.numberOfMovies);
  }

  populateTrackedMoviesState() {
    localforage.getItem<Movie[]>('trackedMovies').then((movieList) => {
      if (movieList) TrackedMoviestStore.dispatch('sortTrackedMovies', movieList);
    });
  }
}
</script>

<style scoped lang="scss">
  #movieList {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0 12px;
  }
</style>

<template>
  <div>
    <ul id="movieList" v-for='(movieRow, index) in MoviesInRows()' :key='index'>
      <li
        v-for='movie in movieRow'
        :key='movie.id'>
          <MovieInOverview :movie=movie />
      </li>
    </ul>
  </div>
</template>
