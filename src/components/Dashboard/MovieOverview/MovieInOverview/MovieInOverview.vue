<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue';
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
    ChevronDownIcon,
  },
})
export default class MovieInOverview extends Vue {
  @Prop() private movie!: Movie;

  hover = false;

  imagePath = 'https://image.tmdb.org/t/p/w185/';

  toggleExpandedMovieInformation() {
    this.$emit('toggleExpandedMovieInformation', this.movie);
  }
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
      .bottom {
        user-select: none;
        display: flex;
        align-self: flex-end;
        justify-content: center;
        width: 100%;
        padding-bottom: 8px;
        margin-top: auto;
        span {
          cursor: pointer;
          padding: 0 8px;
        }
      }
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
      <div class='bottom'>
        <RemoveMovieFromDashboard :movie=movie />
        <ChevronDownIcon v-on:click='toggleExpandedMovieInformation' />
      </div>
    </div>
  </div>
</template>
