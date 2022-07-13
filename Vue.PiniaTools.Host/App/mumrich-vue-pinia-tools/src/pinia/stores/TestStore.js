import { defineStore } from "pinia";
export const useTestStore = defineStore("test", {
    state: () => {
        return {
            message: "",
            messages: [],
        };
    },
});
//# sourceMappingURL=TestStore.js.map