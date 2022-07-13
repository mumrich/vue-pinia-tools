import { ref } from "vue";

export interface IUseBroadcastWindowOptions {
  listenerWindows: Window[];
}

type Payload = {
  channel: string;
  data: string;
};

/**
 * Reactive BroadcastWindow
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage
 * @param options
 */
export const useBroadcastWindow = (options: IUseBroadcastWindowOptions) => {
  const channel = ref<Window | undefined>();
  const data = ref();

  return {
    data,
  };
};
