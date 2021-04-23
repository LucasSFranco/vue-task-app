<template>
  <AppCard>
    <TasksHeader />
    <TasksAddTaskForm />
    <TasksTaskList />
    <TasksFooter />
  </AppCard>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';

import AppCard from '@/components/AppCard.vue';
import TasksAddTaskForm from '@/pages/content/TasksAddTaskForm.vue';
import TasksFooter from '@/pages/content/TasksFooter.vue';
import TasksHeader from '@/pages/content/TasksHeader.vue';
import TasksTaskList from '@/pages/content/TasksTaskList.vue';

export default defineComponent({
  name: 'AppTasks',
  components: {
    AppCard,
    TasksFooter,
    TasksAddTaskForm,
    TasksHeader,
    TasksTaskList,
  },
  data() {
    return {
      unsubscribe: null,
    };
  },
  beforeMount() {
    this.watchTasks().then((unsubcribe) => { this.unsubscribe = unsubcribe; });
  },
  beforeUnmount() {
    this.unsubscribe();
  },
  methods: {
    ...mapActions('tasks', [
      'watchTasks',
    ]),
  },
});
</script>

<style lang="sass"></style>
