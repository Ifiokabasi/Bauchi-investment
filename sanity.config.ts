'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  name: 'default',
  title: 'BIC Studio',
  basePath: '/studio',
  projectId: 'bpfdl4np',        // ← Hardcoded
  dataset: 'production',        // ← Hardcoded
  apiVersion: '2024-03-19',     // ← Hardcoded (use the actual version from your env.ts)
  schema: {types: schemaTypes},
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: '2024-03-19'}), // ← Hardcoded
  ],
})