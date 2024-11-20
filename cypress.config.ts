import { defineConfig } from "cypress";

export default defineConfig({
  // e2e: {
  //   setupNodeEvents(on, config) {
  //     // implement node event listeners here
  //   },
  //   supportFile: "cypress/support/e2e.ts", // Path to your support file
  //   specPattern: "cypress/e2e/**/*.ts", // Path to your TypeScript test files
  // },

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    specPattern: "cypress/component/**/*.cy.{ts,tsx}",
  },
  viewportWidth: 1280, // Set the desired viewport width
  viewportHeight: 720, // Set the desired viewport height
});
