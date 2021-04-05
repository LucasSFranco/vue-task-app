<template>
  <div class="header">
    <h1>Tasks</h1>
    <h6>Get things done, one thing at a time.</h6>
    <button
      class="add-task"
      :class="{ selected: showAddTaskForm }"
      @click="toggleAddTaskFormVisibility"
    >
      <i class="fas fa-plus" />
    </button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'AddTaskForm',
  computed: {
    ...mapGetters(['showAddTaskForm']),
  },
  methods: {
    ...mapMutations(['toggleAddTaskFormVisibility']),
  },
};
</script>

<style scoped lang="sass">
.header
  border-bottom: 1px solid rgba(255, 255, 255, 0.06)
  margin: 32px 24px
  padding-bottom: 16px
  position: relative

  h1
    color: #ffffff
    font-size: 24px
    font-weight: 600
    text-align: center
    margin-bottom: 4px
    text-transform: uppercase

  h6
    color: #b9bbbe
    font-size: 14px
    font-weight: 300
    text-align: center

  button.add-task
    width: 32px
    height: 32px

    display: flex
    align-items: center
    justify-content: center

    position: absolute
    top: 100%
    right: 0
    cursor: pointer

    background: #43b581
    border-radius: 50%
    color: #ffffff
    margin-top: -16px

    &::before
      content: ""

      width: 32px
      height: 32px

      position: absolute

      border-radius: 50%

    i
      font-size: 14px
      z-index: 1

    &:hover
      background: #3ca374

    &:active
      background: #369167

    &.selected
      background: #36393f
      color: #43b581
      border: 2px solid #43b581

      &:hover::before
        background: rgba(67, 181, 129, 0.1)

      &:active::before
        background: rgba(67, 181, 129, 0.2)
</style>
