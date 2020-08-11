<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Header from './components/Header/Header.vue';
import MovieSearch from './components/MovieSearch/MovieSearch.vue';
import 'reset-css';

@Component({
  components: {
    Header,
    MovieSearch,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
  body {
    background: #252525;
    color: #fff;
  }
</style>

<template>
  <div id="app">
    <Header />
    <MovieSearch />
  </div>
</template>
