import { ref } from "vue";
import { Subject } from "rxjs";

export interface IUseBroadcastBrokerOptions {
  /**
   * The name of the channel.
   */
  name: string;
}

export const useBroadcastBroker = (options: IUseBroadcastBrokerOptions) => {
  const isSupported = window && "BroadcastChannel" in window;
  const isClosed = ref(false);
  const channel = ref<BroadcastChannel | undefined>();
  const data$ = new Subject<string>();
  const error = ref<Event | null>(null);

  const post = (message: string) => {
    if (channel.value) channel.value.postMessage(message);
  };

  const close = () => {
    if (channel.value) channel.value.close();
    isClosed.value = true;
  };

  if (isSupported) {
    error.value = null;
    channel.value = new BroadcastChannel(options.name);

    channel.value.addEventListener(
      "message",
      (e: MessageEvent<string>) => {
        data$.next(e.data);
      },
      { passive: true }
    );

    channel.value.addEventListener(
      "messageerror",
      (e: MessageEvent) => {
        error.value = e;
      },
      { passive: true }
    );

    channel.value.addEventListener("close", () => {
      isClosed.value = true;
    });
  }

  const data = data$.asObservable();

  return {
    isSupported,
    channel,
    isClosed,
    post,
    close,
    data,
  };
};
