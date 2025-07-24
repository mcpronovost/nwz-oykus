import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    port: 5173,
    host: true,
    // watch: { usePolling: true },
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import \"src/styles/variables.scss\"; @import \"src/styles/mixins.scss\";"
      }
    }
  },
});
