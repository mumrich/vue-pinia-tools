import { createApp } from "vue";
import App from "./App.vue";
import { BroadcastPiniaPlugin } from "./lib";
import { pinia } from "./pinia";

const app = createApp(App);

pinia.use(BroadcastPiniaPlugin);
app.use(pinia);

app.mount("#app");
