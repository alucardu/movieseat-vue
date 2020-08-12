<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

@Component
export default class MovieInOverview extends Vue {
  @Prop() readonly movie!: Movie;

  imagePath = 'https://image.tmdb.org/t/p/w185/';
}
</script>

<style scoped lang="scss">
  .MovieContainer {
    height: 100%;
    img {
      height: 100%;
      width: 100%;
    }
  }
</style>

<template>
  <div class='MovieContainer'><img :src="imagePath + movie.poster_path" /></div>
</template>
