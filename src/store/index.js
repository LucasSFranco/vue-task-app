import { createStore } from 'vuex';

export default createStore({
  state: {
    showAddTaskForm: false,
  },
  mutations: {
    hideAddTaskForm: (state) => {
      state.showAddTaskForm = false;
    },
    revealAddTaskForm: (state) => {
      state.showAddTaskForm = true;
    },
    toggleAddTaskFormVisibility: (state) => {
      state.showAddTaskForm = !state.showAddTaskForm;
    },
  },
  getters: {
    showAddTaskForm: (state) => state.showAddTaskForm,
  },
});
