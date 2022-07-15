import { defineStore, StateTree, Store } from "pinia";
import { v4 as uuidv4 } from "uuid";
import { useBroadcastChannel } from "@vueuse/core";

const mySenderId = uuidv4();

interface ITestState {
  commonMessage: string;
  messages: string[];
}

type PayloadType = {
  state: StateTree;
  senderId: string;
  href: string;
};

export function debugHelper(payload: PayloadType) {
  const serializedState = JSON.stringify(payload.state);
  console.log(
    `${window.location.href} (${mySenderId}) <== ${payload.href} (${payload.senderId}): ${serializedState}`
  );
}

export const useTestStore = defineStore("test", {
  state: (): ITestState => {
    return {
      commonMessage: "",
      messages: [],
    };
  },
});

export function useStoreBroadcast(store: Store) {
  const { close, channel } = useBroadcastChannel({
    name: "pinia-channel",
  });

  function handleSerializedPayload(serializedPayload: string) {
    if (serializedPayload) {
      const payload: PayloadType = JSON.parse(serializedPayload);
      debugHelper(payload);
      store.$state = payload.state;
    }
  }

  const subscription = store.$subscribe((_mutation, state) => {
    debugger;
    const payload = {
      href: window.location.href,
      senderId: mySenderId,
      state,
    } as PayloadType;
    const serializedPayload = JSON.stringify(payload);

    channel.value?.postMessage(serializedPayload);
  });

  channel.value?.addEventListener("message", (e: MessageEvent<string>) =>
    handleSerializedPayload(e.data)
  );

  store.$dispose = () => {
    subscription();
    close();
  };
}

export const useBroadcastTestStore = () => {
  const testStore = useTestStore();
  useStoreBroadcast(testStore);

  return testStore;
};
