// vitest.config.js
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    maxWorkers: 1,
    threads: false,
    isolate: false,
   
  },
});
