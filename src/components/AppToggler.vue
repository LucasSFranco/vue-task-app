<template>
  <button
    class="toggler"
    @mousedown.prevent
  >
    <slot />
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppToggler',
});
</script>

<style scoped lang="sass">

  .toggler
    width: 32px
    height: 32px

    display: flex
    align-items: center
    justify-content: center

    border-radius: 50%
    color: #ffffff
    cursor: pointer

    transition: background 100ms, color 100ms

    ::v-deep i
      font-size: 14px

    &[primary]
      background: var(--PRIMARY_NORMAL)

      &:hover
        background: var(--PRIMARY_HOVER)

      &:active
        background: var(--PRIMARY_ACTIVE)

      &.selected
        color: var(--PRIMARY_NORMAL)
        background: transparent
        border: 2px solid var(--PRIMARY_NORMAL)

        &:hover
          background: var(--PRIMARY_SELECTED_HOVER)

        &:active
          background: var(--PRIMARY_SELECTED_ACTIVE)

    &[secondary]
      background: var(--SECONDARY_NORMAL)

      &:hover
        background: var(--SECONDARY_HOVER)

      &:active
        background: var(--SECONDARY_ACTIVE)

      &.selected
        color: var(--SECONDARY_NORMAL)
        background: transparent
        border: 2px solid var(--SECONDARY_NORMAL)

        &:hover
          background: var(--SECONDARY_SELECTED_HOVER)

        &:active
          background: var(--SECONDARY_SELECTED_ACTIVE)

    &[danger]
      background: var(--DANGER_NORMAL)

      &:hover
        background: var(--DANGER_HOVER)

      &:active
        background: var(--DANGER_ACTIVE)

      &.selected
        color: var(--DANGER_NORMAL)
        background: transparent
        border: 2px solid var(--DANGER_NORMAL)

        &:hover
          background: var(--DANGER_SELECTED_HOVER)

        &:active
          background: var(--DANGER_SELECTED_ACTIVE)

    &[success]
      background: var(--SUCCESS_NORMAL)

      &:hover
        background: var(--SUCCESS_HOVER)

      &:active
        background: var(--SUCCESS_ACTIVE)

      &.selected
        color: var(--SUCCESS_NORMAL)
        background: transparent
        border: 2px solid var(--SUCCESS_NORMAL)

        &:hover
          background: var(--SUCCESS_SELECTED_HOVER)

        &:active
          background: var(--SUCCESS_SELECTED_ACTIVE)

</style>
