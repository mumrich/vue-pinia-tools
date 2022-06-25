import { PiniaPlugin, StateTree } from "pinia";

type Payload = {
  channel: string;
  data: string;
};

const PINIA_CHANNEL_NAME = "pinia-channel";

function postStateToWindow(w: Window, state: StateTree) {
  const serializedMessage = JSON.stringify(state);
  const payload: Payload = {
    channel: PINIA_CHANNEL_NAME,
    data: serializedMessage,
  };
  w.postMessage(payload, "*");
}

/**
 * Syncs a pinia-store between different windows
 * @param context
 */
export const BroadcastWindowPiniaPlugin: PiniaPlugin = (context) => {
  function onMessageHandler(e: MessageEvent<Payload>) {
    const payload = e.data;

    if (payload?.channel === PINIA_CHANNEL_NAME) {
      context.store.$patch(JSON.parse(payload.data));
    }
  }

  const subscription = context.store.$subscribe((_mutation, state) => {
    state.$windowSubscribers.forEach((w: Window) =>
      postStateToWindow(w, state)
    );
  });

  window.addEventListener("message", onMessageHandler);

  context.store.$dispose = () => {
    window.removeEventListener("message", onMessageHandler);
    subscription();
  };

  return {
    $windowSubscribers: [] as Window[],
  };
};
