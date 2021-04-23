import Task from '@/models/Task';
import db from '@/services/dexie';

export default {
  namespaced: true,

  state: () => ({
    isAddingTask: false,
    tabControl: {
      currentTabId: 'all',
      tabs: {
        all: { tasks: [] },
        pending: { tasks: [] },
        completed: { tasks: [] },
      },
    },
    newTask: new Task(),
    pendingTasksCount: 0,
  }),

  getters: {
    currentTab: (state) => {
      const { currentTabId } = state.tabControl;
      return state.tabControl.tabs[currentTabId];
    },
    currentTabId: (state) => state.tabControl.currentTabId,
    tabs: (state) => state.tabControl.tabs,
  },

  mutations: {
    CHANGE_ADD_TASK_STATE: (state, payload) => {
      state.isAddingTask = payload;
    },
    CHANGE_TAB_CONTROL: (state, payload) => {
      state.tabControl = { ...state.tabControl, ...payload };
    },
    CHANGE_NEW_TASK: (state, payload) => {
      state.newTask = { ...state.newTask, ...payload };
    },
    CHANGE_PENDING_TASKS_COUNT: (state, payload) => {
      state.pendingTasksCount = payload;
    },
    CHANGE_ALL_TASKS: (state, payload) => {
      state.tabControl = {
        ...state.tabControl,
        tabs: {
          ...state.tabControl.tabs,
          all: {
            ...state.tabControl.tabs.all,
            tasks: payload,
          },
        },
      };
    },
    CHANGE_COMPLETED_TASKS: (state, payload) => {
      state.tabControl = {
        ...state.tabControl,
        tabs: {
          ...state.tabControl.tabs,
          completed: {
            ...state.tabControl.tabs.completed,
            tasks: payload,
          },
        },
      };
    },
    CHANGE_PENDING_TASKS: (state, payload) => {
      state.tabControl = {
        ...state.tabControl,
        tabs: {
          ...state.tabControl.tabs,
          pending: {
            ...state.tabControl.tabs.pending,
            tasks: payload,
          },
        },
      };
    },
  },

  actions: {
    toggleAddTaskState({ commit, state }) {
      commit('CHANGE_ADD_TASK_STATE', !state.isAddingTask);
    },
    cancelAddTask({ commit }) {
      commit('CHANGE_ADD_TASK_STATE', false);
    },
    doAddTask({ commit }) {
      commit('CHANGE_ADD_TASK_STATE', true);
    },
    changeCurrentTab({ commit, state }, newCurrentTabId) {
      const tabControl = {
        ...state.tabControl,
        currentTabId: newCurrentTabId,
      };

      commit('CHANGE_TAB_CONTROL', tabControl);
    },
    updateNewTask({ commit }, content) {
      commit('CHANGE_NEW_TASK', content);
    },
    async clearCompletedTasks() {
      await db.table('tasks')
        .filter((task) => task.completed)
        .delete();
    },
    async getPendingTasksCount({ commit }) {
      const pendingTasksCount = await db.table('tasks')
        .filter((task) => !task.completed)
        .count();

      commit('CHANGE_PENDING_TASKS_COUNT', pendingTasksCount);
    },
    async getAllTasks({ commit, state, rootState }) {
      const limit = state.tabControl.tabs.all.tasks.length + 15;

      const allTasks = await db.table('tasks')
        .orderBy('timestamp')
        .reverse()
        .limit(limit)
        .toArray();

      const formattedAllTasks = allTasks.map(
        (task) => new Task(task).format(rootState.configs.selectedLanguage),
      );

      commit('CHANGE_ALL_TASKS', formattedAllTasks);
    },
    async getCompletedTasks({ commit, state, rootState }) {
      const limit = state.tabControl.tabs.completed.tasks.length + 15;

      const completedTasks = await db.table('tasks')
        .orderBy('timestamp')
        .filter((task) => task.completed)
        .reverse()
        .limit(limit)
        .toArray();

      const formattedCompletedTasks = completedTasks.map(
        (completedTask) => new Task(completedTask).format(rootState.configs.selectedLanguage),
      );

      commit('CHANGE_COMPLETED_TASKS', formattedCompletedTasks);
    },
    async getPendingTasks({ commit, state, rootState }) {
      const limit = state.tabControl.tabs.pending.tasks.length + 15;

      const pendingTasks = await db.table('tasks')
        .orderBy('timestamp')
        .filter((task) => !task.completed)
        .reverse()
        .limit(limit)
        .toArray();

      const formattedPendingTasks = pendingTasks.map(
        (pendingTask) => new Task(pendingTask).format(rootState.configs.selectedLanguage),
      );

      commit('CHANGE_PENDING_TASKS', formattedPendingTasks);
    },
    async addTask({ dispatch, state }) {
      const newTask = new Task(state.newTask);

      if (!newTask.validate()) {
        dispatch('cancelAddTask');
        return;
      }

      await db.table('tasks').add(newTask.data());

      dispatch('cancelAddTask');
    },
    async deleteTask(context, selectedTask) {
      await db.table('tasks').delete(selectedTask.id);
    },
    async toggleTaskCompletion(context, selectedTask) {
      selectedTask = new Task(selectedTask);

      await db.table('tasks').update(selectedTask.id, selectedTask.toggleCompletion());
    },
    watchTasks({ dispatch }) {
      const subscriber = (changes) => {
        changes.forEach((change) => {
          if (change.table !== 'tasks') return;

          dispatch('getPendingTasksCount');
          dispatch('getAllTasks');
          dispatch('getCompletedTasks');
          dispatch('getPendingTasks');
        });
      };

      db.on('changes', subscriber);

      dispatch('getPendingTasksCount');
      dispatch('getAllTasks');
      dispatch('getCompletedTasks');
      dispatch('getPendingTasks');

      return () => {
        db.on('changes').unsubscribe(subscriber);
      };
    },
  },
};
