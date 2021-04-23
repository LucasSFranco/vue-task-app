<template>
  <button class="dropdown__item">
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppDropdownItem',
});
</script>

<style scoped lang="sass">

  .dropdown__item
    height: 32px

    display: flex
    align-items: center

    border-radius: 2px
    color: var(--INTERACTIVE_NORMAL)
    cursor: pointer
    font-size: 14px
    margin: 2px 0
    padding: 6px 8px

    &:hover
      background: var(--PRIMARY_HOVER)
      color: var(--INTERACTIVE_HOVER)

    &:active
      background: var(--PRIMARY_ACTIVE)
      color: var(--INTERACTIVE_ACTIVE)

    &.selected
      background: var(--PRIMARY_SELECTED)
      color: var(--INTERACTIVE_SELECTED)
      cursor: default

</style>
