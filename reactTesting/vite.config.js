import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react({ jsxRuntime: "automatic" }), tailwindcss()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    globals: true,
    threads: false,
  },
  esbuild: {
    jsx: "automatic", // Use automatic JSX runtime
  },
});
