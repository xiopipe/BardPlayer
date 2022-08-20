import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 10,
  }),
  getters: {
    doubleCount: (state) => state.counter * 5,
  },
  actions: {
    increment() {
      this.counter++;
    },
  },
});
