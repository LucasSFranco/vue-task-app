<template>
  <a class="link">
    <slot />
  </a>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppLink',
});
</script>

<style scoped lang="sass">

  .link
    color: var(--BLUE)
    cursor: pointer
    display: inline-block
    font-size: inherit
    font-weight: 400
    line-height: inherit

    &:hover
      text-decoration: underline

</style>
