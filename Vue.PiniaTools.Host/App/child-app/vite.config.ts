import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const protocol = process.env.HMR_PROTOCOL ?? "ws";
const port = Number(process.env.HMR_PORT) ?? 3000;
const base = process.env.SERVER_BASE ?? "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    hmr: {
      protocol,
      port,
    },
    port: 8989,
    base,
  },
});
