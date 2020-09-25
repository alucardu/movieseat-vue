<script lang="ts">
import MenuIcon from 'vue-material-design-icons/Menu.vue';
import { defineComponent, ref } from '@vue/composition-api';
import MovieSorting from './MovieSorting/MovieSorting.vue';

export default defineComponent({
  name: 'HeaderMenu',
  components: {
    MenuIcon,
    MovieSorting,
  },
  setup() {
    const menuDisplay = ref(false);

    const toggleMenu = () => {
      menuDisplay.value = !menuDisplay.value;
    };

    return {
      menuDisplay,
      toggleMenu,
    };
  },
});

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
