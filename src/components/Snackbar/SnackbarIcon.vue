<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CheckIcon from 'vue-material-design-icons/Check.vue';
import AlertCircleIcon from 'vue-material-design-icons/AlertCircle.vue';

@Component({
  components: {
    CheckIcon,
    AlertCircleIcon,
  },
})
export default class SnackbarIcon extends Vue {
  @Prop() private icon!: string;
}
</script>

<style lang="scss">
</style>

<template>
  <div>
    <CheckIcon v-if="icon === 'success'"/>
    <AlertCircleIcon v-if="icon === 'warning'" />
  </div>
</template>
