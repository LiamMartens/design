import schemaTypes from 'all:part:@sanity/base/schema-type'
import createSchema from 'part:@sanity/base/schema-creator'

import {article} from './article'

export default createSchema({
  name: 'sanity-design-studio',
  types: schemaTypes.concat([article]),
})
