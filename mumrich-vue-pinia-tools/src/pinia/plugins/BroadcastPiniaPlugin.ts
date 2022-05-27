import { useBroadcastChannel } from "@vueuse/core";
import { PiniaPlugin } from "pinia";
import { watch } from "vue";

const BroadcastPiniaPlugin: PiniaPlugin = (context) => {
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

export default BroadcastPiniaPlugin;
