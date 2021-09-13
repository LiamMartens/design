import {CloseIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Flex,
  Layer,
  Portal,
  Stack,
  Text,
  useClickOutside,
  useGlobalKeyDown,
  useLayer,
} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import {useWorkshop} from '../../useWorkshop'
import {SchemeSwitch} from '../navbar/schemeSwitch'
import {ViewportMenuButton} from '../navbar/viewportMenuButton'
import {ZoomMenuButton} from '../navbar/zoomMenuButton'
import {Inspector} from './inspector'

const Root = styled(Layer)`
  position: absolute;
  inset: 0 0 0 auto;
  width: calc(100% - 51px);
  max-width: 300px;
  transform: translate3d(100%, 0, 0);
  transition: transform 200ms, box-shadow 200ms;

  &:not([data-open]) > div {
    box-shadow: 0 0 0 var(--card-shadow-outline-color);
  }

  &[data-open] {
    transform: translate3d(0, 0, 0);
  }
`

export function InspectorDrawer(): React.ReactElement {
  const {closeInspectorDrawer, inspectorDrawer: open} = useWorkshop()
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const {isTopLayer} = useLayer()

  const handleEscape = useCallback(() => {
    if (isTopLayer) closeInspectorDrawer()
  }, [closeInspectorDrawer, isTopLayer])

  const handleGlobalKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleEscape()
    },
    [handleEscape]
  )

  useClickOutside(handleEscape, [rootElement])

  useGlobalKeyDown(handleGlobalKeyDown)

  return (
    <Portal>
      <Root data-open={open ? '' : undefined}>
        <Card height="fill" ref={setRootElement} shadow={3}>
          <Flex paddingX={3} paddingY={2} style={{lineHeight: 0}}>
            <Box flex={1} padding={2}>
              <Text size={1} weight="medium">
                Inspector
              </Text>
            </Box>
            <Box>
              <Button
                fontSize={1}
                icon={CloseIcon}
                mode="bleed"
                onClick={closeInspectorDrawer}
                padding={2}
              />
            </Box>
          </Flex>

          <Box padding={3} style={{borderTop: '1px solid var(--card-border-color)', lineHeight: 0}}>
            <Stack space={2}>
              <Flex align="center">
                <Box flex={1} paddingLeft={2}>
                  <Text muted size={1}>
                    Zoom
                  </Text>
                </Box>
                <Box>
                  <ZoomMenuButton />
                </Box>
              </Flex>

              <Flex align="center">
                <Box flex={1} paddingLeft={2}>
                  <Text muted size={1}>
                    Viewport
                  </Text>
                </Box>
                <Box>
                  <ViewportMenuButton />
                </Box>
              </Flex>

              <Flex align="center">
                <Box flex={1} paddingLeft={2}>
                  <Text muted size={1}>
                    Scheme
                  </Text>
                </Box>
                <Box>
                  <SchemeSwitch />
                </Box>
              </Flex>
            </Stack>
          </Box>

          <Box style={{borderTop: '1px solid var(--card-border-color)'}}>
            <Inspector />
          </Box>
        </Card>
      </Root>
    </Portal>
  )
}
