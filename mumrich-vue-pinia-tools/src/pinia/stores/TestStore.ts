import { defineStore } from "pinia";

interface ITestState {
  message: string;
  messages: string[];
}

export const useTestStore = defineStore("test", {
  state: (): ITestState => {
    return {
      message: "",
      messages: [],
    };
  },
});
