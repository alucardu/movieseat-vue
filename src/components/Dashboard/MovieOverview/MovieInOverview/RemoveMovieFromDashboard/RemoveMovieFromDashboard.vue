<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Movie } from '@/types/';
import TrackedMoviesStore from '@/stores/TrackedMoviesStore';
import localforage from 'localforage';
import DeleteForeverIcon from 'vue-material-design-icons/DeleteForever.vue';
import SnackbarStore from '@/stores/SnackbarStore';

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
</style>

<template>
  <DeleteForeverIcon class='delete-icon' v-on:click='removeMovie' />
</template>
