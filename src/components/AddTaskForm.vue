<template>
  <div
    v-show="showAddTaskForm"
    class="add-task-form"
  >
    <div
      ref="textarea"
      class="textarea"
      contenteditable="plaintext-only"
      placeholder="Write a new task..."
      tabindex="0"
      @input="handleInput"
      @keydown.exact.enter.prevent
    />
    <small>
      escape to <button
        @click="hideAddTaskForm"
      >cancel</button>
      <i class="fas fa-circle" />
      enter to <button
        @click="handleAddTask"
      >save</button>
    </small>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

import Task from '@/models/Task';
import { addTask } from '@/services';

export default {
  name: 'AddTaskForm',
  data() {
    return {
      task: new Task(),
    };
  },
  computed: {
    ...mapGetters([
      'showAddTaskForm',
    ]),
  },
  watch: {
    showAddTaskForm(value) {
      const { textarea } = this.$refs;

      if (value) {
        setTimeout(() => {
          textarea.focus();
        }, 0);
      } else {
        textarea.innerHTML = '';
      }
    },
  },
  mounted() {
    window.addEventListener('keydown', this.keymap);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.keymap);
  },
  methods: {
    ...mapMutations([
      'hideAddTaskForm',
      'revealAddTaskForm',
    ]),
    async handleAddTask() {
      if (!this.task.validate()) return this.hideAddTaskForm();

      await addTask(this.task);

      this.task = new Task();
    },
    handleInput({ target }) {
      const { textContent } = target;

      this.task.description = textContent.trim();
    },
    keymap({ key, shiftKey }) {
      if (key === 'Escape') return this.hideAddTaskForm();
      if (key === 'Enter') {
        if (shiftKey) return;
        if (this.showAddTaskForm) return this.handleAddTask();
        return this.revealAddTaskForm();
      }
    },
  },
};
</script>

<style scoped lang="sass">

.add-task-form
  border-bottom: 1px solid rgba(255, 255, 255, 0.06)
  margin: 0 24px
  padding-bottom: 16px

  .textarea
    min-height: 44px
    max-height: 132px

    background: #40444b
    border-radius: 8px
    color: #dcddde
    font-weight: 300
    line-height: 22px
    overflow: hidden scroll
    padding: 11px

    &::-webkit-scrollbar
      width: 12px
      height: 12px

    &::-webkit-scrollbar-thumb
      background-clip: padding-box
      background-color: rgba(24, 25, 28, 0.6)
      border: 4px solid transparent
      border-radius: 6px

    &:empty::before
      content: attr(placeholder)
      color: #72767d
      pointer-events: none

  small
    display: flex
    align-items: center

    color: #dcddde
    font-size: 10px
    font-weight: 300
    margin-top: 4px

    i
      font-size: 4px
      margin: 0 4px

    button
      color: #7289da
      cursor: pointer
      font-size: inherit
      margin-left: 4px

      &:hover
        text-decoration: underline

</style>
