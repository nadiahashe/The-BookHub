const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: "cypress/support/e2e.ts", // Path to your support file
    specPattern: "cypress/e2e/**/*.ts"     // Path to your TypeScript test files
  },
});
