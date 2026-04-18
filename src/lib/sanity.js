import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'z6z2mi2n',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})