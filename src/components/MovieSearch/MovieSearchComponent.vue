<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MovieSearchResultList from './MovieSearchResultList/MovieSearchResultList.vue';
import MovieSearchInput from './MovieSearchInput/MovieSearchInput.vue';

@Component({
  components: {
    MovieSearchInput,
    MovieSearchResultList,
  },
})
export default class MovieSearchComponent extends Vue {}
</script>

<style lang="scss" scoped>
  #movieSearchContainer {
    display: flex;
    position: relative;
    justify-content: center;
  }
</style>

<template>
  <div id='movieSearchContainer'>
    <MovieSearchInput />
    <MovieSearchResultList />
  </div>
</template>
