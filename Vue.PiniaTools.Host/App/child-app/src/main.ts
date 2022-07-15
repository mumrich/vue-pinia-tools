import { createApp } from "vue";
import App from "./App.vue";
import { pinia } from "./pinia";
// import { BroadcastPiniaPlugin } from "../../mumrich-vue-pinia-tools/src/lib";

const app = createApp(App);

// pinia.use(BroadcastPiniaPlugin);
app.use(pinia);

app.mount("#app");
