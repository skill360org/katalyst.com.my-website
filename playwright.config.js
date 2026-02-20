import { defineConfig } from "@playwright/test";

export default defineConfig({
  timeout: 30000,
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  use: {
    baseURL: "http://localhost:4173",
  },
  webServer: {
    command: "npm run build && npx vite preview --port 4173",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
