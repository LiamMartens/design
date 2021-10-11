import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('utils/region', 'Region', [
  {
    name: 'test',
    title: 'Test',
    component: lazy(() => import('./test')),
  },
])
