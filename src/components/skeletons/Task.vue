<template>
  <li
    v-for="index in 20"
    :key="index"
    class="skeleton-of-task"
    :style="{ opacity: 1 - index * 0.05 }"
  >
    <div class="button left" />
    <div class="text" />
    <div class="button right" />
  </li>
</template>

<script>
export default {
  name: 'SkeletonOfTask',
};
</script>

<style scoped lang="sass">

.skeleton-of-task
  display: flex
  align-items: center
  padding: 0 8px

  & + &
    margin-top: 8px

  & > *
    background: #2f3136
    border-radius: 3px

    & + *
      margin-left: 8px

  .text
    height: 22px

    flex-grow: 1

  .button
    flex-shrink: 0

    &.left
      width: 22px
      height: 22px

    &.right
      width: 14px
      height: 14px
</style>
