import {CloseIcon} from '@sanity/icons'
import {
  Box,
  Button,
  Card,
  Flex,
  Layer,
  Portal,
  Text,
  useClickOutside,
  useGlobalKeyDown,
  useLayer,
} from '@sanity/ui'
import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import {useWorkshop} from '../../useWorkshop'
import {Navigator} from './navigator'

const Root = styled(Layer)`
  position: absolute;
  inset: 0 auto 0 0;
  width: calc(100% - 51px);
  max-width: 300;
`

export function NavigatorDrawer(): React.ReactElement {
  const {closeNavigatorDrawer, navigatorDrawer: open} = useWorkshop()
  const [rootElement, setRootElement] = useState<HTMLDivElement | null>(null)
  const {isTopLayer} = useLayer()

  const handleEscape = useCallback(() => {
    if (isTopLayer) closeNavigatorDrawer()
  }, [closeNavigatorDrawer, isTopLayer])

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
      <Root hidden={!open}>
        <Card height="fill" ref={setRootElement} shadow={3}>
          <Flex direction="column" height="fill">
            <Flex paddingX={3} paddingY={2} style={{lineHeight: 0}}>
              <Box flex={1} padding={2}>
                <Text size={1} weight="medium">
                  Navigator
                </Text>
              </Box>
              <Box>
                <Button
                  fontSize={1}
                  icon={CloseIcon}
                  mode="bleed"
                  onClick={closeNavigatorDrawer}
                  padding={2}
                />
              </Box>
            </Flex>

            <Box flex={1} overflow="auto" style={{borderTop: '1px solid var(--card-border-color)'}}>
              <Navigator />
            </Box>
          </Flex>
        </Card>
      </Root>
    </Portal>
  )
}
