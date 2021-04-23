<template>
  <button class="tab-control__button">
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTabControlButton',
});
</script>

<style scoped lang="sass">

  .tab-control__button
    min-width: 40px

    display: flex
    align-items: center
    justify-content: center

    background: var(--BACKGROUND_MODIFIER_NORMAL)
    color: var(--INTERACTIVE_NORMAL)
    cursor: pointer
    font-size: 12px
    border-radius: 4px
    padding: 4px 8px

    &:hover
      background: var(--BACKGROUND_MODIFIER_HOVER)
      color: var(--INTERACTIVE_HOVER)

    &:active
      background: var(--BACKGROUND_MODIFIER_ACTIVE)
      color: var(--INTERACTIVE_ACTIVE)

    &.selected
      background: var(--BACKGROUND_MODIFIER_SELECTED)
      color: var(--INTERACTIVE_SELECTED)
      cursor: default

</style>
