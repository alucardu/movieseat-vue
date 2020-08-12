<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SnackbarStore from '@/stores/SnackbarStore';
import SnackbarIcon from './SnackbarIcon.vue';

@Component({
  components: {
    SnackbarIcon,
  },
})
export default class Snackbar extends Vue {
  snackbar = {
    visible: false,
    text: '',
    color: '',
    icon: '',
  }

  mounted() {
    SnackbarStore.subscribe((mutation, state) => {
      this.snackbar.visible = state.snackbar.visible;
      this.snackbar.text = state.snackbar.text;
      this.setType(state.snackbar.type);
    });
  }

  setType(type: string) {
    switch (type) {
      case 'success':
        this.snackbar.color = '#4caf50';
        this.snackbar.icon = 'success';
        break;
      case 'warning':
        this.snackbar.color = '#ff9900';
        this.snackbar.icon = 'warning';
        break;
      default:
        break;
    }
  }
}
</script>

<style lang="scss">
  .v-snackbar-wrapper {
    min-width: auto;
    div.v-snack__content {
      font-size: 1rem;
      display: flex;
      align-items: center;
      div {
        margin-right: 16px;
        svg {
          margin-top: 4px;
        }
      }
    }
  }
</style>

<template>
  <div>
    <v-snackbar
      class='v-snackbar-wrapper'
      :color='snackbar.color'
      v-bind:class='snackbar.type'
      v-model='snackbar.visible'>
      <SnackbarIcon :icon='snackbar.icon' />
      {{ snackbar.text }}
    </v-snackbar>
  </div>
</template>
