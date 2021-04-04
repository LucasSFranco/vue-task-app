<template>
  <div
    class="task-list"
    @click="log"
  >
    <div v-if="tasks">
      <ul v-if="tasks.length">
        <Task :tasks="tasks" />
      </ul>

      <div
        v-else
        class="empty"
      >
        <div class="image-wrapper">
          <img
            src="@/assets/empty.svg"
            alt=""
          >
        </div>
        <p>Hmm! Seems you have nothing to do for now.</p>
      </div>
    </div>

    <ul v-else>
      <SkeletonOfTask />
    </ul>
  </div>
</template>

<script>
import { Task } from '@/components';
import { SkeletonOfTask } from '@/components/skeletons';
import { getTasks, watchTasks } from '@/services';

export default {
  name: 'TaskList',
  components: {
    Task,
    SkeletonOfTask,
  },
  data() {
    return {
      tasks: null,
    };
  },
  mounted() {
    watchTasks(this.handleGetTasks);
  },
  methods: {
    async handleGetTasks() {
      this.tasks = await getTasks();
    },
  },
};
</script>

<style scoped lang="sass">

.task-list
  flex-grow: 1
  margin: 0 8px 32px
  position: relative

  ul
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0

    overflow: hidden scroll
    padding: 0 8px 0 16px

    &::-webkit-scrollbar
      width: 8px

    &::-webkit-scrollbar-thumb
      background-clip: padding-box
      background-color: #202225
      border: 2px solid transparent
      border-radius: 4px

      visibility: hidden

    &:hover::-webkit-scrollbar-thumb
      visibility: visible

  > div
    width: 100%
    height: 100%

    .empty
      width: 100%
      height: 100%

      display: flex
      align-items: center
      flex-direction: column
      justify-content: center

      .image-wrapper
        height: 140px
        margin-bottom: 16px

        img
          height: 100%

          filter: grayscale(1)

      p
        color: #72767d
        font-size: 14px
        font-weight: 300
        text-align: center

</style>
