<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SnackbarStore from '@/stores/SnackbarStore';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';
import localforage from 'localforage';

type Movie = {
  title: string;
  release_date: string;
  id: number;
  backdrop_path: string;
}

type SortingConfiguration = {
  sortType: string;
  ascOrder: boolean;
}

@Component({
  components: {
  },
})
export default class MovieSorting extends Vue {
  orderTypes = ['Release date', 'Title'];

  sortType = ''

  ascOrder = false;

  mounted() {
    localforage.getItem<SortingConfiguration>('sortingConfiguration').then((value) => {
      if (value) {
        this.sortType = value.sortType;
        this.ascOrder = value.ascOrder;
      }
    });
  }

  applySorting() {
    localforage.setItem('sortingConfiguration', { sortType: this.sortType, ascOrder: this.ascOrder }).then(() => {
      this.$emit('input', false);
      TrackedMoviestStore.dispatch('sortTrackedMovies', TrackedMoviestStore.state.trackedMovieList);
    });
    SnackbarStore.commit('showSnackbar', { text: 'Sorting has been applied and stored.', type: 'success' });
  }

  returnSortType(movie: Movie, selectedSortType: string) {
    switch (selectedSortType) {
      case 'Release date':
        return movie.release_date;
      case 'Title':
        return movie.title;
      default:
        return '';
    }
  }
}
</script>

<style lang="scss">
  .v-select__selection, .v-label, .v-icon {
    color: #fff!important;
  }
  .v-input__slot:before {
    border-color: #fff!important;
  }
  .v-label--active {
    transform: none!important;
    top: -15px!important;
    font-size: 12px!important;
  }
  .v-input--selection-controls {
    margin-bottom: 16px;
  }
  .button {
    background: linear-gradient(45deg, #0fcece 20%, #ff60f3 90%);
    border: 0;
    border-radius: 3;
    box-shadow: 0 3px 5px 2px rgba(255, 105, 135, .3);
    color: white!important;
    height: 48;
    padding: 0 30px;
    width: 100%;
  }

</style>

<template>
  <div>
    <v-select
      :items="orderTypes"
      label="Sort movies on dashboard by:"
      color="#fff"
      hide-details="false"
      v-model='sortType'
    ></v-select>
    <v-checkbox
      v-model="ascOrder"
      label="List in ascending order"
      hide-details="false"
    ></v-checkbox>
    <v-btn large class='button' v-on:click='applySorting'>Apply sorting</v-btn>
  </div>
</template>
