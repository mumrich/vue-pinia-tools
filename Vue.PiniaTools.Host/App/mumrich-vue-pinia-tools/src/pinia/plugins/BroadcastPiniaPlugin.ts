import { useBroadcastChannel } from "@vueuse/core";
import { PiniaPlugin, StateTree } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { watch } from "vue";

const mySenderId = uuidv4();

type PayloadType = {
  state: StateTree;
  senderId: string;
  href: string;
};

function debugHelper(payload: PayloadType) {
  const serializedState = JSON.stringify(payload.state);
  console.log(
    `${window.location.href} (${mySenderId}) <== ${payload.href} (${payload.senderId}): ${serializedState}`
  );
}

/**
 * Syncs a pinia-store between different documents (in different windows, tabs, frames, or iframes) of the ***same origin***.
 *
 * @see https://vueuse.org/core/usebroadcastchannel/#usebroadcastchannel
 * @param context
 */
export const BroadcastPiniaPlugin: PiniaPlugin = (context) => {
  const { post, close, data, channel } = useBroadcastChannel({
    name: "pinia-channel",
  });

  function handleSerializedPayload(serializedPayload: string) {
    if (serializedPayload) {
      const payload: PayloadType = JSON.parse(serializedPayload);
      debugger;
      debugHelper(payload);
    }
  }

  const subscription = context.store.$subscribe((_mutation, state) => {
    debugger;
    const payload = {
      href: window.location.href,
      senderId: mySenderId,
      state,
    } as PayloadType;
    const serializedPayload = JSON.stringify(payload);

    post(serializedPayload);
  });

  channel.value?.addEventListener("message", (e: MessageEvent<string>) =>
    handleSerializedPayload(e.data)
  );

  // watch(
  //   data,
  //   (serializedPayload) => {
  //     if (serializedPayload) {
  //       const payload: PayloadType = JSON.parse(serializedPayload);
  //       debugHelper(payload);
  //       context.store.$patch(payload.state);
  //     }
  //   },
  //   { immediate: true }
  // );

  context.store.$dispose = () => {
    subscription();
    close();
  };
};
