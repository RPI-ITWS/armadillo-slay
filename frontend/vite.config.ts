import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '#video': path.resolve(__dirname,'src/components/hero/assets/hero-background.mp4'),
    },
    extensions: [
        ".mp4",
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".json",
        ".mjs",
        ".wasm",
        ".svg",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".webp",
    ]
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
