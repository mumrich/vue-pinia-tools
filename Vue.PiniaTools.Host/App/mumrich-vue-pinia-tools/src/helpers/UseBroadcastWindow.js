import { ref } from "vue";
/**
 * Reactive BroadcastWindow
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 * @param options
 */
export const useBroadcastWindow = (options) => {
    const channel = ref();
    const data = ref();
    return {
        data,
    };
};
//# sourceMappingURL=UseBroadcastWindow.js.map