<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import localforage from 'localforage';
import TrackedMoviestStore from '../../../../stores/TrackedMoviesStore';
import MovieSearchListStore from '../../../../stores/MovieSearchListStore';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

const backdropUrl = 'https://image.tmdb.org/t/p/w780';

@Component
export default class AddMovieToDashboard extends Vue {
  @Prop() readonly movie!: Movie;

  get style() {
    return this.movie.backdrop_path ? `background-image: url(${backdropUrl + this.movie.backdrop_path}` : null;
  }

  trackedMovies(): Movie[] {
    return TrackedMoviestStore.state.trackedMovieList;
  }

  addMovie = () => {
    TrackedMoviestStore.commit('addMovieToTrackedMovies', this.movie);
    localforage.setItem('trackedMovies', this.trackedMovies());
    MovieSearchListStore.commit('clearList', []);
  }
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
