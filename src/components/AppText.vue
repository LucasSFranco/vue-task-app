<template>
  <p class="text">
    <slot />
  </p>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppText',
});
</script>

<style scoped lang="sass">

  .text
    color: var(--TEXT_PRIMARY)
    flex-grow: 1
    font-size: 14px
    font-weight: 300
    line-height: 22px

</style>
