import { useBroadcastChannel } from "@vueuse/core";
import { PiniaPlugin } from "pinia";
import { watch } from "vue";

/**
 * Syncs a pinia-store between different documents (in different windows, tabs, frames, or iframes) of the ***same origin***.
 *
 * @see https://vueuse.org/core/usebroadcastchannel/#usebroadcastchannel
 * @param context
 */
export const BroadcastPiniaPlugin: PiniaPlugin = (context) => {
  const { post, close, data } = useBroadcastChannel({
    name: "pinia-channel",
  });

  const subscription = context.store.$subscribe((_mutation, state) => {
    post(JSON.stringify(state));
  });

  watch(data, () => {
    if (data.value) {
      context.store.$patch(JSON.parse(data.value));
    }
  });

  context.store.$dispose = () => {
    subscription();
    close();
  };
};
