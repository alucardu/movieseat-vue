<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Movie } from '@/types/';
import localforage from 'localforage';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';
import MovieSearchListStore from '@/stores/MovieSearchListStore';
import SnackbarStore from '@/stores/SnackbarStore';

type Rating = {
  value: number;
  id: number;
}

const backdropUrl = 'https://image.tmdb.org/t/p/w780';

@Component
export default class AddMovieToDashboard extends Vue {
  @Prop() readonly movie!: Movie;

  get style() {
    return this.movie.backdrop_path ? `background-image: url(${backdropUrl + this.movie.backdrop_path}` : null;
  }

  movies: Array<Movie> = [{
    title: '',
    id: 0,
    backdrop_path: '',
    poster_path: '',
    overview: '',
    release_date: '',
    selected: false,
  }];

  mounted() {
    this.movies = TrackedMoviestStore.getters.list;
  }

  addMovie() {
    this.setInitialRating();
    let text = `${this.movie.title} is already added to your watchlist.`;
    let type = 'warning';
    if (!this.checkIsMovieDuplicate(this.movies, this.movie)) {
      TrackedMoviestStore.dispatch('addMovieToTrackedMovies', this.movie);
      localforage.setItem('trackedMovies', this.movies);
      text = `${this.movie.title} is added to your watchlist.`;
      type = 'success';
    } else {
      (document.getElementById('movieSearchInput') as HTMLInputElement).value = '';
    }
    MovieSearchListStore.commit('clearList', []);
    SnackbarStore.commit('showSnackbar', { text, type });
  }

  setInitialRating() {
    TrackedMoviestStore.dispatch('addRating', { movie: this.movie });
  }

  checkIsMovieDuplicate = (movies: Movie[], movie: Movie) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const item of movies) {
      if (item.id === movie.id) return true;
    }
    return false;
  };
}
</script>

<style scoped lang="scss">
  #overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    background-size: cover;
    div {
      background: #00000073;
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      button {
        color: #fff;
        padding: 8px;
        background: #0fcece;
        border-radius: 12px;
        border: none;
        outline:none;
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div id="overlay" :style='style'>
    <div>
      <button v-on:click='addMovie'>Add movie to your watchlist</button>
    </div>
  </div>
</template>
