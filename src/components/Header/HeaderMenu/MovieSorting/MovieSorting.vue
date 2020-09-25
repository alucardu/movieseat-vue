<script lang="ts">
import { SortingConfiguration } from '@/types/';
import SnackbarStore from '@/stores/SnackbarStore';
import TrackedMoviestStore from '@/stores/TrackedMoviesStore';
import localforage from 'localforage';
import { defineComponent, onMounted, ref } from '@vue/composition-api';

export default defineComponent({
  name: 'MovieSorting',
  setup(prop, { emit }) {
    const orderTypes = ['Release date', 'Title', 'Rating'];
    const sortTypeRef = ref('');
    const ascOrderRef = ref(false);

    const applySorting = (sortType: string, ascOrder: boolean) => {
      localforage.setItem('sortingConfiguration', { sortType, ascOrder }).then(() => {
        emit('input', false);
        TrackedMoviestStore.dispatch('sortTrackedMovies', TrackedMoviestStore.state.trackedMovieList);
      });
      SnackbarStore.commit('showSnackbar', { text: 'Sorting has been applied and stored.', type: 'success' });
    };

    onMounted(() => {
      localforage.getItem<SortingConfiguration>('sortingConfiguration').then((value) => {
        if (value) {
          sortTypeRef.value = value.sortType;
          ascOrderRef.value = value.ascOrder;
        }
      });
    });

    return {
      orderTypes,
      sortTypeRef,
      ascOrderRef,
      applySorting,
    };
  },
});
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
      v-model='sortTypeRef'
    ></v-select>
    <v-checkbox
      v-model="ascOrderRef"
      label="List in ascending order"
      hide-details="false"
    ></v-checkbox>
    <v-btn large class='button'
      v-on:click='applySorting(sortTypeRef, ascOrderRef)'>Apply sorting</v-btn>
  </div>
</template>
