import { defineStore } from 'pinia';

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: '世界和平3'
  }),
  // getters
  getters: {
    nameLength: (state) => state.name.length
  }
});
