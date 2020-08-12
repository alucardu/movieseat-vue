<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import TrackedMoviesStore from '@/stores/TrackedMoviesStore';
import localforage from 'localforage';
import DeleteForeverIcon from 'vue-material-design-icons/DeleteForever.vue';
import SnackbarStore from '@/stores/SnackbarStore';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

@Component({
  components: {
    DeleteForeverIcon,
  },
})
export default class RemoveMovieFromDashboard extends Vue {
  @Prop() private movie!: Movie;

  removeMovie() {
    const { trackedMovieList } = TrackedMoviesStore.state;
    trackedMovieList.forEach((item, index) => {
      if (item.id === this.movie.id) {
        trackedMovieList.splice(index, 1);
        localforage.setItem('trackedMovies', trackedMovieList);
        TrackedMoviesStore.commit('removeMovieFromTrackedList', trackedMovieList);
        SnackbarStore.commit('showSnackbar', {
          text: `${this.movie.title} has been removed from your watchlist.`,
          type: 'success',
        });
      }
    });
  }
}
</script>

<style scoped lang="scss">
  .overlay {
    position: absolute;
    background: #000000b5;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    span.delete-icon {
      display: flex;
      align-self: flex-end;
      justify-content: center;
      width: 100%;
      padding-bottom: 8px;
      svg {
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div class="overlay">
    <DeleteForeverIcon class='delete-icon' v-on:click='removeMovie' />
  </div>
</template>
