<template>
  <li
    v-for="task in tasks"
    :key="task.id"
    class="task"
    :class="{ completed: task.completed }"
  >
    <button
      class="toggle-task-completion"
      :class="{ selected: task.completed }"
      @click="handleToggleTaskCompletion(task)"
    >
      <i class="fas fa-check" />
    </button>
    <p>{{ task.description }}</p>
    <button
      class="delete-task"
      @click="handleDeleteTask(task)"
    >
      <i class="fas fa-times" />
    </button>
    <time>{{ task.timestamp }}</time>
  </li>
</template>

<script>
import { toggleTaskCompletion, deleteTask } from '@/services';

export default {
  name: 'TaskList',
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      updatedTasks: this.tasks,
    };
  },
  methods: {
    async handleToggleTaskCompletion(task) {
      await toggleTaskCompletion(task);
    },
    async handleDeleteTask(task) {
      await deleteTask(task);
    },
  },
};
</script>

<style scoped lang="sass">

.task
  display: flex
  align-items: center

  color: #dcddde
  font-size: 14px
  font-weight: 300
  line-height: 22px
  padding: 8px 0
  position: relative

  & + &
    border-top: 1px solid rgba(255, 255, 255, 0.06)

  p
    flex-grow: 1
    user-select: text

  time
    position: absolute
    top: 100%
    right: 26px

    background: #2f3136
    border-radius: 3px
    color: #b9bbbe
    display: inline-block
    font-size: 10px
    font-weight: 300
    padding: 2px 4px
    transform: translateY(-50%)
    visibility: hidden
    z-index: 1

  button
    display: flex
    align-items: center

    cursor: pointer
    flex-shrink: 0
    margin: 0 8px

    i
      font-size: 14px

    &:active
      transform: translateY(1px)

    &.toggle-task-completion
      color: #747f8d

      &:hover
        color: #68727f

      &:active
        color: #5d6671

      &.selected
        color: #43b581

        &:hover
          color: #3ca374

        &:active
          color: #369167

    &.delete-task
      color: #f04747

      &:hover
        color: #d84040

      &:active
        color: #c03939

  &:hover
    border-radius: 8px
    background: rgba(79, 84, 92, 0.16)
    border-color: transparent

    time
      visibility: visible

  &:hover + &
    border-color: transparent

  &.completed p
    color: #b9bbbe
    text-decoration: line-through

</style>
