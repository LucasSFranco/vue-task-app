import i18n from '@/i18n';

export default {
  namespaced: true,

  state: () => ({
    selectedLanguage: localStorage.getItem('selectedLanguage') || 'en-us',
    selectedTheme: localStorage.getItem('selectedTheme') || 'dark',
    languages: [
      { key: 'en-us', label: 'English, US' },
      { key: 'pt-br', label: 'Português, Brasil' },
    ],
    themes: [
      { key: 'dark' },
      { key: 'light' },
    ],
  }),

  mutations: {
    CHANGE_SELECTED_LANGUAGE: (state, payload) => {
      state.selectedLanguage = payload;
    },
    CHANGE_SELECTED_THEME: (state, payload) => {
      state.selectedTheme = payload;
    },
  },

  actions: {
    changeSelectedLanguage({ commit, dispatch }, language) {
      localStorage.setItem('selectedLanguage', language);

      commit('CHANGE_SELECTED_LANGUAGE', language);

      dispatch('defineLocale');
    },
    changeSelectedTheme({ commit }, theme) {
      localStorage.setItem('selectedTheme', theme);

      commit('CHANGE_SELECTED_THEME', theme);
    },
    defineLocale({ state }) {
      i18n.global.locale = state.selectedLanguage;
    },
  },
};
