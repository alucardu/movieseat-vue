<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import localforage from 'localforage';
import { chunk } from 'lodash';
import { Movie } from '@/types/';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';
import MovieInOverview from './MovieInOverview/MovieInOverview.vue';
import ExpandedMovieInformation from './ExpandedMovieInformation/ExpandedMovieInformation.vue';

@Component({
  components: {
    MovieInOverview,
    ExpandedMovieInformation,
  },
})
export default class MovieOverview extends Vue {
  mq = window.matchMedia('(max-width: 600px)').matches;

  currentIndex = -1;

  movie: Movie | undefined;

  currentMovie: Movie | undefined;

  uniqueKey = 0;

  mounted() {
    localforage.getItem('sortingConfiguration').then((value) => {
      if (!value) localforage.setItem('sortingConfiguration', { sortType: 'Release date', ascOrder: true });
    });
    this.populateTrackedMoviesState();

    localforage.getItem('rating').then((value) => {
      if (!value) localforage.setItem('rating', []);
    });

    window.addEventListener('resize', this.MoviesInRows);
    return () => {
      window.removeEventListener('resize', this.MoviesInRows);
    };
  }

  numberOfMovies = 0;

  MoviesInRows() {
    this.numberOfMovies = this.mq ? 100 : Math.floor((window.innerWidth - 24) / 185);
    return chunk(TrackedMoviestStore.state.trackedMovieList, this.numberOfMovies);
  }

  populateTrackedMoviesState() {
    localforage.getItem<Movie[]>('trackedMovies').then((movieList) => {
      if (movieList) TrackedMoviestStore.dispatch('sortTrackedMovies', movieList);
    });
  }

  toggleExpandedMovieInformation(movie: Movie, index: number) {
    this.uniqueKey += 1;
    this.movie = movie;
    if (index === this.currentIndex && this.currentMovie?.id === movie.id) {
      this.currentIndex = -1;
    } else {
      this.currentIndex = index;
      this.currentMovie = movie;
    }
  }
}
</script>

<style scoped lang="scss">
  #movieList {
    list-style: none;
    display: flex;
    flex-direction: column;;
    padding: 0;
    margin: 0 12px;
    div {
      width: 100%;
      display: flex;
      li {
        max-width: 185px;
      }
    }
  }
  @media only screen and (max-width: 600px) {
    #movieList {
      div {
        overflow: scroll;
        li {
          min-width: 185px;
        }
      }
    }
  }
</style>

<template>
  <div>
    <ul id="movieList" v-for='(movieRow, index) in MoviesInRows()' :key='index'>
      <div>
        <li
          v-for='movie in movieRow'
          :key='movie.id'>
            <MovieInOverview
              :movie=movie
              @toggleExpandedMovieInformation="toggleExpandedMovieInformation(movie, index)"/>
        </li>
      </div>
      <ExpandedMovieInformation
        v-if='currentIndex === index'
        :movie=movie
        @toggleExpandedMovieInformation="toggleExpandedMovieInformation(movie, index)"
        :key='uniqueKey' />
    </ul>
  </div>
</template>
