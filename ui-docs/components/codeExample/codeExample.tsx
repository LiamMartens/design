import * as ui from '@sanity/ui'
import {Box, Card, Code} from '@sanity/ui'
import React from 'react'
import {renderCode} from './helpers'

export function CodeExample(props: {code: string; language: string}) {
  const {code, language} = props
  const result = renderCode(code, {React, ...ui})

  return (
    <Card marginY={[2, 2, 3, 4]} radius={2} shadow={1} style={{overflow: 'hidden'}}>
      <Card style={{overflow: 'auto'}} tone="transparent">
        {result.type === 'success' && <Box padding={[3, 3, 4, 5]}>{result.node}</Box>}
        {result.type === 'error' && (
          <Card padding={[3, 3, 4, 5]}>
            <Code style={{color: 'red'}} size={[2, 2, 3, 4]}>
              {result.error.message}
            </Code>
          </Card>
        )}
      </Card>
      <Card padding={[3, 3, 4, 5]} style={{overflow: 'auto'}}>
        <Code language={language} size={[2, 2, 3]}>
          {code}
        </Code>
      </Card>
    </Card>
  )
}