<template>
  <div class="tab-control">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTabControl',
});
</script>

<style scoped lang="sass">

  .tab-control
    display: flex

    &::v-deep
      & > * + *
        margin-left: 8px

</style>
