import {defineScope} from '@sanity/ui-workshop'
import {lazy} from 'react'

export default defineScope('color', 'Color', [
  {
    name: 'overview',
    title: 'Overview',
    component: lazy(() => import('./color/overview')),
  },
  {
    name: 'grid',
    title: 'Grid',
    component: lazy(() => import('./color/grid')),
  },
])
