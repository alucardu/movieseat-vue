<script lang="ts">
import { Movie } from '@/types/';
import TrackedMoviesStore from '@/stores/TrackedMoviesStore';
import localforage from 'localforage';
import DeleteForeverIcon from 'vue-material-design-icons/DeleteForever.vue';
import SnackbarStore from '@/stores/SnackbarStore';
import { defineComponent, PropType } from '@vue/composition-api';

export default defineComponent({
  name: 'RemoveMovieFromDashboard',
  props: {
    movie: {
      type: Object as PropType<Movie>,
      default: {
        title: '',
        id: 0,
        backdrop_path: '',
        poster_path: '',
        overview: '',
        release_date: '',
        selected: false,
      },
    },
  },
  components: {
    DeleteForeverIcon,
  },
  setup(prop) {
    const { movie } = prop;

    const removeMovie = () => {
      const { trackedMovieList } = TrackedMoviesStore.state;
      trackedMovieList.forEach((item, index) => {
        if (item.id === movie.id) {
          trackedMovieList.splice(index, 1);
          localforage.setItem('trackedMovies', trackedMovieList);
          TrackedMoviesStore.commit('removeMovieFromTrackedList', trackedMovieList);
          SnackbarStore.commit('showSnackbar', {
            text: `${movie.title} asd has been removed from your watchlist.`,
            type: 'success',
          });
        }
      });
    };

    return {
      removeMovie,
    };
  },
});

</script>

<style scoped lang="scss">
</style>

<template>
  <DeleteForeverIcon class='delete-icon' v-on:click='removeMovie' />
</template>
