import { useBroadcastBroker } from "mumrich-vue-pinia-tools";
import { defineStore, StateTree, Store } from "pinia";
import { v4 as uuidv4 } from "uuid";

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
  const { close, data, post } = useBroadcastBroker({
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

    post(serializedPayload);
  });

  data.subscribe(handleSerializedPayload);

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
