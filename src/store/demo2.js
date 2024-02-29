import { defineStore } from 'pinia';

export const useWdyStore = defineStore({
  id: 'wdy',
  state: () => ({
    name: '啥也不是'
  }),
  // getters
  getters: {
    nameLength: (state) => state.name.length
  },
  actions: {
    async wdyInfo(val) {
      this.name = val;
    }
  }
});
