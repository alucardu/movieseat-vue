<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MovieSearchListStore from '../../../stores/MovieSearchListStore';
import TrackedMoviestStore from '../../../stores/TrackedMoviesStore';
import AddMovieToDashboard from './AddMoveToDashboard/AddMovieToDashboard.vue';

type Movie = {
  title: string;
  id: number;
}

@Component({
  components: {
    AddMovieToDashboard,
  },
})
export default class MovieSearchResultList extends Vue {
  mounted() {
    TrackedMoviestStore.subscribe(() => {
      MovieSearchListStore.commit('clearList', []);
    });
  }

  imagePath = 'https://image.tmdb.org/t/p/w45';

  public hover = 0;

  public hoverEvent(index: number) {
    this.hover = index;
  }

  get searchList(): Movie[] {
    return MovieSearchListStore.state.searchList;
  }
}
</script>

<style scoped lang="scss">
  #movieSearchResultList {
    background: #3a3a3a;
    position: absolute;
    z-index: 1;
    list-style: none;
    top: 46px;
    width: 50%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    li {
      padding: 0 0px 0 8px;
      display: flex;
      align-items: center;
      position: relative;
      height: 68px;
      &:nth-child(even) {
        background: #444444;
      }
      &:hover {
        background: #0fcece;
      }
      p {
        width: calc(98% - 45px);
        display: flex;
        flex-direction: column;
        span:nth-child(1) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span:nth-child(2) {
          font-size: 12px;
          color: #929292;
        }
      }
      img {
        margin-left: auto;
        width: 45px;
        height: 100%;
      }
    }
  }
</style>

<template>
  <ul id='movieSearchResultList'>
    <li
      v-for='movie in searchList'
      v-on:mouseover='hoverEvent(movie.id)'
      v-on:mouseleave='hoverEvent(null)'
      :key='movie.id'>
      <p>
        <span>{{ movie.original_title }}</span>
        <span>{{ movie.release_date }}</span>
      </p>
      <img :src="movie.poster_path
        ? `${imagePath + movie.poster_path}`
        : 'poster_not_found.svg'" />
      <AddMovieToDashboard v-if='hover === movie.id' :movie="movie"/>
    </li>
  </ul>
</template>
