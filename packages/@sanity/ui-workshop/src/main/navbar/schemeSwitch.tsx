import {MoonIcon, SunIcon} from '@sanity/icons'
import {Box, Button, Flex, Switch, Text} from '@sanity/ui'
import React, {useCallback} from 'react'

import {useWorkshop} from '../../useWorkshop'

export function SchemeSwitch(): React.ReactElement {
  const {scheme, setScheme} = useWorkshop()

  const handleToggleScheme = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const target = event.currentTarget

      setScheme(target.checked ? 'dark' : 'light')
    },
    [setScheme]
  )

  return (
    <Button as="label" mode="bleed" padding={3}>
      <Flex align="center">
        <Text>
          <SunIcon />
        </Text>

        <Box paddingX={3} style={{margin: '-4px 0'}}>
          <Switch checked={scheme === 'dark'} onChange={handleToggleScheme} />
        </Box>

        <Text>
          <MoonIcon />
        </Text>
      </Flex>
    </Button>
  )
}
