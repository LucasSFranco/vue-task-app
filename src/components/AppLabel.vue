<template>
  <h6 class="label">
    <slot />
  </h6>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLabel',
});
</script>

<style scoped lang="sass">

  .label
    font-weight: 500
    text-transform: uppercase

    &[primary]
      font-size: 14px
      color: var(--TEXT_PRIMARY)
      margin-bottom: 4px

    &[secondary]
      font-size: 12px
      color: var(--TEXT_TERTIARY)
      margin-bottom: 8px

</style>
