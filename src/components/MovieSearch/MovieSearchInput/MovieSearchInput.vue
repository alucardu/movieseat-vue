<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { debounce } from 'lodash';
import MovieSearchListStore from '../../../stores/MovieSearchListStore';

const baseurl = 'https://api.themoviedb.org/3/search/movie?';
const apikey = 'api_key=a8f7039633f2065942cd8a28d7cadad4';

@Component
export default class MovieSearch extends Vue {
  fetchMovies = debounce((searchQuery) => {
    if (searchQuery) {
      fetch(`${baseurl + apikey}&language=en-US&query=${searchQuery}&page=1&include_adult=false`)
        .then((response) => response.json())
        .then((data) => MovieSearchListStore.commit('createList', data));
    } else {
      console.log('clear search');
    }
  }, 500);
}
</script>

<style scoped lang="scss">
  div#SeachContainer {
    width: 100%;
    display: flex;
    justify-content: center;
    input {
      padding: 8px;
      margin: 12px 0 12px 0;
      width: 50%;
      border: none;
      font-size: 16px;
      box-sizing: border-box;
      &:focus {
        outline: none;
        color: #fff;
        background: #ff6a00;
        &::placeholder {
          color: #fff;
        }
      }
    }
  }
</style>

<template>
  <div id="SeachContainer">
    <input placeholder="Enter a movie title" v-on:keyup='fetchMovies($event.target.value)'>
  </div>
</template>
