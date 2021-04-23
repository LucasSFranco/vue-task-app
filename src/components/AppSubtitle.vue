<template>
  <h6 class="subtitle">
    <slot />
  </h6>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSubtitle',
});
</script>

<style scoped lang="sass">

  .subtitle
    color: var(--HEADER_SECONDARY)
    font-size: 14px
    font-weight: 300
    text-align: center

</style>
