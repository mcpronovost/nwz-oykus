import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const watchUsePolling = env.VITE_WATCH_USE_POLLING === "true";

  return {
    server: {
      port: 5173,
      host: true,
      watch: { usePolling: watchUsePolling },
      proxy: {
        "/api": {
          target: "http://backend:8000",
          changeOrigin: true,
          secure: false,
        },
      },
    },
    plugins: [react()],
    build: {
      outDir: "dist",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  };
});
