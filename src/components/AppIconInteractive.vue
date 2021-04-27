<template>
  <div class="icon-interactive">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppIconInteractive',
});
</script>

<style scoped lang="sass">

  .icon-interactive
    cursor: pointer
    flex-shrink: 0
    margin: 0 8px

    :deep(i)
      font-size: 14px

    &:active
      transform: translateY(1px)

    &[primary]
      color: var(--PRIMARY_NORMAL)

      &:hover
        color: var(--PRIMARY_HOVER)

      &:active
        color: var(--PRIMARY_ACTIVE)

    &[secondary]
      color: var(--SECONDARY_NORMAL)

      &:hover
        color: var(--SECONDARY_HOVER)

      &:active
        color: var(--SECONDARY_ACTIVE)

    &[danger]
      color: var(--DANGER_NORMAL)

      &:hover
        color: var(--DANGER_HOVER)

      &:active
        color: var(--DANGER_ACTIVE)

    &[success]
      color: var(--SUCCESS_NORMAL)

      &:hover
        color: var(--SUCCESS_HOVER)

      &:active
        color: var(--SUCCESS_ACTIVE)

</style>
