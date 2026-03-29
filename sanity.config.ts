import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {schemaTypes} from './schemaTypes'
import {blogPostLocaleBadges} from './schemaTypes/components/blogPostLocaleBadges'

export default defineConfig({
  name: 'default',
  title: 'Админка проектов',

  projectId: 'vh20xg14',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), colorInput()],

  schema: {
    types: schemaTypes,
  },

  document: {
    badges: (prev, context) =>
      context.schemaType === 'blogPost' ? [...prev, ...blogPostLocaleBadges] : prev,
  },
})
