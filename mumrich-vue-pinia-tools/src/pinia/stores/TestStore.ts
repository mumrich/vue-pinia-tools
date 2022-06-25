import { defineStore } from "pinia";

class TestState {
  message: string = "";
  messages: string[] = [];
}

export const useTestStore = defineStore("test", {
  state: () => {
    return new TestState();
  },
});
