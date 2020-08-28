<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api';
import { Movie } from '@/types/';
import CloseIcon from 'vue-material-design-icons/Close.vue';

const backdropUrl = 'https://image.tmdb.org/t/p/w1280';

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<Movie>,
    },
  },
  name: 'ExpandedMovieInformation',
  components: {
    CloseIcon,
  },
  setup(props, { emit }) {
    const { movie } = props;
    const backgroundImage = movie ? `url(${backdropUrl + movie.backdrop_path}` : null;

    const toggleMovieInformation = () => {
      emit('toggleExpandedMovieInformation', props.movie);
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
  <div class='expanded-movie-information-container'
    :style='{ backgroundImage: backgroundImage }'>
    <div class='overlay'>
      <CloseIcon class='close' v-on:click='toggleMovieInformation' />
      <h1>{{ movie.title }}</h1>
      <span class='release-date'> {{ movie.release_date }}</span>
      <p>{{ movie.overview }}</p>
    </div>
  </div>
</template>
