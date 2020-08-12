<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MovieSearchResultList from './MovieSearchResultList/MovieSearchResultList.vue';
import MovieSearchInput from './MovieSearchInput/MovieSearchInput.vue';
import MovieSearchListStore from '../../stores/MovieSearchListStore';

type Movie = {
  title: string;
  id: number;
}

@Component({
  components: {
    MovieSearchInput,
    MovieSearchResultList,
  },
})
export default class MovieSearchComponent extends Vue {
  get searchList(): Movie[] {
    return MovieSearchListStore.state.searchList;
  }
}
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
    <MovieSearchResultList v-if='searchList.length > 0'/>
  </div>
</template>
