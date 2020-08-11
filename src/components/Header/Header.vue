<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
  header {
    display: flex;
    background: #0fcece;
    padding: 24px;
    h1 {
      font-size: 3.5em;
      color: #fff;
      margin: 0;
      font-family: 'Oleo Script Swash Caps', cursive;
      text-shadow: 2px 2px 5px #000;
    }
  }
</style>

<template>
  <header>
    <h1>Movieseat</h1>
  </header>
</template>
