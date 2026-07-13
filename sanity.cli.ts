/**
 * This configuration file lets you run `$ sanity [command]` in this folder
 * Go to https://www.sanity.io/docs/cli to learn more.
 **/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'bpfdl4np',     // ← Hardcoded
    dataset: 'production',      // ← Hardcoded
  },
  deployment: {
    appId: 'nbf73v8l1zlejgyyj97w5jid'  // ← Add this from your earlier deployment
  }
})