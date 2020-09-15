<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Movie } from '@/types/';
import CloseIcon from 'vue-material-design-icons/Close.vue';
import TrackedMoviesStore from '@/stores/TrackedMoviesStore';

export default defineComponent({
  name: 'ExpandedMovieInformation',
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
      },
    },
  },
  components: {
    CloseIcon,
  },
  setup(props, { emit }) {
    const { movie } = props;
    const backdropUrl = 'https://image.tmdb.org/t/p/w1280';
    const backgroundImage = movie ? `url(${backdropUrl + movie.backdrop_path}` : null;

    const toggleMovieInformation = () => {
      emit('toggleExpandedMovieInformation', movie);
      TrackedMoviesStore.dispatch('selectMovie', movie.id);
    };

    return {
      toggleMovieInformation,
      backgroundImage,
    };
  },
});
</script>

<style scoped lang="scss">
  .expanded-movie-information-container {
    height: 400px;
    background: #000;
    background-size: cover;
    background-position: top;
    overflow: hidden;
    .overlay {
      background: #00000094;
      width: 100%;
      margin: 24px;
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
        transition: transform .2s, color .2s, opacity .2s;
        &:hover {
          color: #ff6a00;
          transform: scale(1.5);
        }
      }
    }
  }
</style>

<template>
  <div class='expanded-movie-information-container'
    :style='{ backgroundImage: backgroundImage }'>
    <div class='overlay'>
      <CloseIcon class='close' v-on:click='toggleMovieInformation' />
      <h1>{{ movie.title }}</h1>
      <span class='release-date'>{{ movie.release_date }}</span>
      <p>{{ movie.overview }}</p>
    </div>
  </div>
</template>
