import {ControlsIcon, MenuIcon} from '@sanity/icons'
import {Box, Breadcrumbs, Button, Card, Flex, LayerProvider, Text} from '@sanity/ui'
import React, {useCallback} from 'react'
import styled from 'styled-components'
import {useWorkshop} from '../../useWorkshop'
import {SchemeSwitch} from './schemeSwitch'
import {ViewportMenuButton} from './viewportMenuButton'
import {ZoomMenuButton} from './zoomMenuButton'

const Root = styled(Card)`
  line-height: 0;
`

export function Navbar(): React.ReactElement {
  const {openInspectorDrawer, openNavigatorDrawer, pushLocation, scope, story, title} =
    useWorkshop()

  const handleHomeClick = useCallback(
    (event) => {
      if (event.shiftKey || event.ctrlKey) return
      event.preventDefault()
      pushLocation({path: '/'})
    },
    [pushLocation]
  )

  return (
    <Root borderBottom padding={2}>
      <Flex align="center">
        <Box display={['block', 'block', 'none']}>
          <Button icon={MenuIcon} mode="bleed" onClick={openNavigatorDrawer} padding={3} />
        </Box>

        <Flex
          flex={1}
          justify={['center', 'center', 'flex-start']}
          padding={3}
          sizing="border"
          style={{minWidth: 250}}
        >
          <Breadcrumbs separator={<Text muted>/</Text>} space={2}>
            <Text weight="bold">
              <a href="/" onClick={handleHomeClick} style={{color: 'inherit'}}>
                {title}
              </a>
            </Text>

            {scope && <Text align="center">{scope.title}</Text>}

            {story && <Text>{story.title}</Text>}
          </Breadcrumbs>
        </Flex>

        <Box display={['block', 'block', 'none']}>
          <Button icon={ControlsIcon} mode="bleed" onClick={openInspectorDrawer} padding={3} />
        </Box>

        <Box display={['none', 'none', 'block']} flex={1}>
          <Flex align="center" justify="flex-end">
            <LayerProvider zOffset={100}>
              <ZoomMenuButton />
            </LayerProvider>

            <Flex marginLeft={2}>
              <LayerProvider zOffset={100}>
                <ViewportMenuButton />
              </LayerProvider>
            </Flex>

            <Box marginLeft={2}>
              <SchemeSwitch />
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Root>
  )
}
