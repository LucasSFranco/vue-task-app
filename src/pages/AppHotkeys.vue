<template>
  <template />
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions, mapState } from 'vuex';

export default defineComponent({
  name: 'AppHotkeys',
  computed: {
    ...mapState('tasks', [
      'isAddingTask',
    ]),
  },
  beforeMount() {
    window.addEventListener('keydown', this.keymap);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.keymap);
  },
  methods: {
    ...mapActions('tasks', [
      'addTask',
      'doAddTask',
      'cancelAddTask',
    ]),
    keymap({
      code, altKey, ctrlKey, shiftKey, metaKey,
    }) {
      if (shiftKey) return;
      if (ctrlKey) return;
      if (altKey) return;
      if (metaKey) return;

      switch (code) {
        case 'Escape':
          return this.cancelAddTask();
        case 'Enter':
          return this.isAddingTask ? this.addTask() : this.doAddTask();
        default:
      }
    },
  },
});
</script>

<style lang="sass"></style>
