<template>
  <AppStackedListItem
    class="tasks__task-list__item"
    :class="{'completed': task.completed }"
  >
    <AppIconInteractive
      class="toggle-completion"
      v-bind="{[task.completed ? 'success': 'secondary']: true}"
      @click="toggleTaskCompletion(task)"
    >
      <i class="fas fa-check" />
    </AppIconInteractive>
    <AppText>{{ task.description }}</AppText>
    <AppIconInteractive
      class="delete"
      danger
      @click="deleteTask(task)"
    >
      <i class="fas fa-times" />
    </AppIconInteractive>
    <time>{{ task.timestamp }}</time>
  </AppStackedListItem>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import AppIconInteractive from '@/components/AppIconInteractive.vue';
import AppStackedListItem from '@/components/AppStackedListItem.vue';
import AppText from '@/components/AppText.vue';

export default defineComponent({
  name: 'TasksTaskListItem',
  components: {
    AppIconInteractive,
    AppStackedListItem,
    AppText,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions('tasks', [
      'toggleTaskCompletion',
      'deleteTask',
    ]),
  },
});
</script>

<style scoped lang="sass">

  .tasks__task-list__item
    position: relative

    .text
      user-select: text

    time
      position: absolute
      top: 100%
      right: 26px

      background: var(--BACKGROUND_SECONDARY)
      border-radius: 3px
      color: var(--TEXT_SECONDARY)
      display: inline-block
      font-size: 10px
      font-weight: 300
      padding: 2px 4px
      transform: translateY(-50%)
      visibility: hidden
      z-index: 1

    .delete
      visibility: hidden

    &:hover
      time
        visibility: visible

      .delete
        visibility: visible

    &.completed
      p
        text-decoration: line-through

</style>
