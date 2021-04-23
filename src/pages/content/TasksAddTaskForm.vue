<template>
  <TransitionYCollapsible v-show="isAddingTask">
    <div class="tasks__add-task-form">
      <AppTextareaExpansible
        ref="taskInput"
        :placeholder="$t('tasks.addTaskForm.placeholder')"
        :value="newTask.description"
        @input="updateNewTask({ description: $event})"
      />
      <AppSubtext>
        escape {{ $t('tasks.addTaskForm.to') }}&nbsp;
        <AppLink @click="cancelAddTask">
          {{ $t('tasks.addTaskForm.cancelButton') }}
        </AppLink>
        &nbsp;●
        enter {{ $t('tasks.addTaskForm.to') }}&nbsp;
        <AppLink @click="addTask">
          {{ $t('tasks.addTaskForm.saveButton') }}
        </AppLink>
      </AppSubtext>
    </div>
  </TransitionYCollapsible>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

import AppLink from '@/components/AppLink.vue';
import AppTextareaExpansible from '@/components/AppTextareaExpansible.vue';
import AppSubtext from '@/components/AppSubtext.vue';
import TransitionYCollapsible from '@/components/animations/TransitionYCollapsible.vue';

export default defineComponent({
  name: 'TasksHeader',
  components: {
    AppLink,
    AppSubtext,
    AppTextareaExpansible,
    TransitionYCollapsible,
  },
  data() {
    return {
      visibilityChangeTimeout: null,
    };
  },
  computed: {
    ...mapState('tasks', [
      'isAddingTask',
      'newTask',
    ]),
  },
  watch: {
    isAddingTask(value) {
      const { taskInput } = this.$refs;

      clearTimeout(this.visibilityChangeTimeout);

      this.visibilityChangeTimeout = value
        ? setTimeout(taskInput.focus, 100)
        : setTimeout(() => {
          taskInput.clear();
          this.updateNewTask({ description: '' });
        }, 500);
    },
  },
  methods: {
    ...mapActions('tasks', [
      'cancelAddTask',
      'doAddTask',
      'addTask',
      'updateNewTask',
    ]),
  },
});
</script>

<style scoped lang="sass">

  .wrapper
    position: relative

    &::after
      content: ''

      height: 1px

      position: absolute
      left: 24px
      right: 24px
      bottom: 0

      background: var(--BACKGROUND_MODIFIER_ACCENT)

    .tasks__add-task-form
      margin: 8px 24px 0
      padding-bottom: 16px

      .subtext
        margin-top: 4px

</style>
