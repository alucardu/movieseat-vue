<script lang="ts">
import {
  computed,
  defineComponent, onMounted, ref,
} from '@vue/composition-api';
import localforage from 'localforage';
import { chunk } from 'lodash';
import { Movie } from '@/types/';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';
import MovieInOverview from './MovieInOverview/MovieInOverview.vue';
import ExpandedMovieInformation from './ExpandedMovieInformation/ExpandedMovieInformation.vue';

export default defineComponent({
  name: 'MovieOverview',
  components: {
    MovieInOverview,
    ExpandedMovieInformation,
  },
  setup() {
    const mq = window.matchMedia('(max-width: 600px)').matches;
    const toggleValue = ref(false);
    const currentMovie = ref<Movie>();
    const currentIndex = ref(0);
    const numberOfMovies = ref(0);

    const Movies = computed(() => TrackedMoviestStore.state.trackedMovieList);

    const MoviesInRows = () => {
      numberOfMovies.value = mq ? 100 : Math.floor((window.innerWidth - 24) / 185);
      return chunk(TrackedMoviestStore.state.trackedMovieList, numberOfMovies.value);
    };

    const populateTrackedMoviesState = () => {
      localforage.getItem<Movie[]>('trackedMovies').then((movieList) => {
        if (movieList) TrackedMoviestStore.dispatch('sortTrackedMovies', movieList);
      });
    };

    const toggleExpandedMovieInformation = (movie: Movie, index: number) => {
      currentIndex.value = index;
      toggleValue.value = !toggleValue.value || currentMovie.value?.id !== movie.id;
      currentMovie.value = movie;
    };

    onMounted(() => {
      localforage.getItem('sortingConfiguration').then((value) => {
        if (!value) localforage.setItem('sortingConfiguration', { sortType: 'Release date', ascOrder: true });
      });
      populateTrackedMoviesState();

      localforage.getItem('rating').then((value) => {
        if (!value) localforage.setItem('rating', []);
      });

      window.addEventListener('resize', MoviesInRows);
      return () => {
        window.removeEventListener('resize', MoviesInRows);
      };
    });

    return {
      Movies,
      MoviesInRows,
      toggleExpandedMovieInformation,
      toggleValue,
      currentMovie,
      currentIndex,
    };
  },
});

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
    .slide-enter-active, .slide-leave-active {
      transition: height .2s ease-in-out;
    }
    .slide-enter, .slide-leave-to {
      height: 0;
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
              :movie="movie"
              @toggleExpandedMovieInformation="toggleExpandedMovieInformation(movie, index)" />
        </li>
      </div>
      <transition name="slide">
        <ExpandedMovieInformation
          v-if='toggleValue && currentIndex === index'
          :movie="currentMovie"
          @toggleExpandedMovieInformation="toggleExpandedMovieInformation(currentMovie)"
          :key='currentMovie.id' />
      </transition>
    </ul>
  </div>
</template>
