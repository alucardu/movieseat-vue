<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import CloseIcon from 'vue-material-design-icons/Close.vue';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

const backdropUrl = 'https://image.tmdb.org/t/p/w1280';

@Component({
  components: {
    CloseIcon,
  },
})
export default class ExpandedMovieInformation extends Vue {
  @Prop() private movie!: Movie;

  get style() {
    return this.movie.backdrop_path ? `background-image: url(${backdropUrl + this.movie.backdrop_path}` : null;
  }

  foo() {
    this.$emit('toggleExpandedMovieInformation', this.movie);
  }
}
</script>

<style scoped lang="scss">
  .expanded-movie-information-container {
    height: 400px;
    background: #000;
    padding: 24px;
    background-size: cover;
    background-position: top;
    .overlay {
      background: #00000094;
      width: 100%;
      height: 100%;
      padding: 24px;
      border-radius: 8px;;
      h1 {
        float: left;
        font-size: 2em;
      }
      .release-date {
        font-size: 0.8em;
        padding: 16px 0;
        display: block;
        clear: both;
      }
      .close {
        float: right;
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div class='expanded-movie-information-container' :style='style'>
    <div class='overlay'>
      <CloseIcon class='close' v-on:click='foo' />
      <h1>{{ movie.title }}</h1>
      <span class='release-date'> {{ movie.release_date }}</span>
      <p>{{ movie.overview }}</p>
    </div>
  </div>
</template>
