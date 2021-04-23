<template>
  <small class="subtext">
    <slot />
  </small>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSubtext',
});
</script>

<style scoped lang="sass">

  .subtext
    display: flex
    align-items: center

    color: var(--TEXT_PRIMARY)
    font-size: 10px
    font-weight: 300

</style>
