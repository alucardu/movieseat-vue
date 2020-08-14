<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import MovieSorting from './MovieSorting/MovieSorting.vue';

@Component({
  components: {
    MenuIcon,
    MovieSorting,
  },
})
export default class HeaderMenu extends Vue {
  menuDisplay = false;

  parentValue = false

  toggleMenu() {
    this.menuDisplay = !this.menuDisplay;
  }
}
</script>

<style lang="scss">
  .menuIcon {
    cursor: pointer;
    svg {
      height: 36px;
      width: 36px;
    }
  }
  .menuContainer {
    position: absolute;
    z-index: 1;
    right: 0;
    width: 250px;
    padding: 8px;
    background: #ff6a00;
  }
</style>

<template>
  <div>
    <MenuIcon
      class='menuIcon'
      v-on:click='toggleMenu' />
    <div
      v-if='menuDisplay'
      class='menuContainer'>
      <MovieSorting v-model='menuDisplay' />
    </div>
  </div>
</template>
