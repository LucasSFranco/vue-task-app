<template>
  <template v-if="currentTab.tasks.length">
    <AppStackedList
      class="tasks__all-tasks-tab"
      @load-more="handleLoadMore"
    >
      <TransitionStackedList>
        <TasksTaskListItem
          v-for="task in currentTab.tasks"
          :key="task.id"
          :task="task"
        />
      </TransitionStackedList>
    </AppStackedList>
  </template>
  <template v-else>
    <div class="empty">
      <div class="image-wrapper">
        <img
          :src="require(`@/assets/empty-${currentTabId}-tasks.svg`)"
          draggable="false"
        >
      </div>
      <p>{{ $t(`tasks.list.empty.${currentTabId}`) }}</p>
    </div>
  </template>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapGetters } from 'vuex';

import AppStackedList from '@/components/AppStackedList.vue';
import TransitionStackedList from '@/components/animations/TransitionStackedList.vue';
import TasksTaskListItem from '@/pages/content/TasksTaskListItem.vue';

export default defineComponent({
  name: 'TasksTabAllTasks',
  components: {
    AppStackedList,
    TransitionStackedList,
    TasksTaskListItem,
  },
  data() {
    return {
      promise: null,
    };
  },
  computed: {
    ...mapGetters('tasks', [
      'currentTab',
      'currentTabId',
    ]),
  },
  methods: {
    ...mapActions('tasks', [
      'getAllTasks',
      'getCompletedTasks',
      'getPendingTasks',
    ]),
    async loadMore() {
      switch (this.currentTabId) {
        case 'all':
          return this.getAllTasks();
        case 'completed':
          return this.getCompletedTasks();
        case 'pending':
          return this.getPendingTasks();
        default:
      }
    },
    handleLoadMore() {
      if (this.promise) return;

      this.promise = this.loadMore();
      this.promise.then(
        () => { this.promise = null; },
      );
    },
  },
});
</script>

<style scoped lang="sass">

  .tasks__all-tasks-tab
    .title
      margin-bottom: 4px

    .toggler-wrapper
      width: 32px
      height: 32px

      position: absolute
      bottom: -16px
      right: 0

      background: var(--BACKGROUND_PRIMARY)
      border-radius: 50%

  .empty
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center

    flex-grow: 1
    padding: 24px

    .image-wrapper
      max-width: 150px
      max-height: 150px

      display: flex
      margin-bottom: 16px

      img
        width: 100%
        height: 100%

        filter: grayscale(1)

    p
      color: var(--TEXT_TERTIARY)
      font-size: 14px
      text-align: center

</style>
