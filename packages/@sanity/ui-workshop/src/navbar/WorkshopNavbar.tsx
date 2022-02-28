import {ControlsIcon, LaunchIcon, MenuIcon, MoonIcon, SelectIcon, SunIcon} from '@sanity/icons'
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  Flex,
  Inline,
  Menu,
  MenuButton,
  MenuItem,
  Text,
} from '@sanity/ui'
import React, {memo, useCallback, useMemo} from 'react'
import {VIEWPORT_OPTIONS, ZOOM_OPTIONS} from '../constants'
import {buildFrameUrl} from '../helpers'
import {useWorkshop} from '../useWorkshop'

export const WorkshopNavbar = memo(function WorkshopNavbar(): React.ReactElement {
  const {broadcast, scope, story, title} = useWorkshop()

  const handleHomeClick = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault()
      broadcast({type: 'workshop/setPath', value: '/'})
    },
    [broadcast]
  )

  return (
    <Card borderBottom flex="none" padding={2} style={{lineHeight: 0}}>
      <Flex gap={1}>
        <Box display={['block', 'block', 'none']}>
          <Button fontSize={1} icon={MenuIcon} mode="bleed" padding={2} />
        </Box>

        <Flex
          flex={1}
          justify={['center', 'center', 'flex-start']}
          padding={2}
          sizing="border"
          style={{minWidth: 250}}
        >
          <Breadcrumbs
            separator={
              <Text muted size={1}>
                /
              </Text>
            }
            space={2}
          >
            <Text size={1} weight="bold">
              <a href="/" onClick={handleHomeClick} style={{color: 'inherit'}}>
                {title}
              </a>
            </Text>

            {scope && (
              <Text align="center" size={1}>
                {scope.title}
              </Text>
            )}

            {story && <Text size={1}>{story.title}</Text>}
          </Breadcrumbs>
        </Flex>

        <Box display={['block', 'block', 'none']}>
          <Button fontSize={1} icon={ControlsIcon} mode="bleed" padding={2} />
        </Box>

        <Box display={['none', 'none', 'block']}>
          <Inline space={1}>
            <OpenCanvasButton />
            <ViewportMenu />
            <ZoomMenu />
            <SchemeMenu />
          </Inline>
        </Box>
      </Flex>
    </Card>
  )
})

const OpenCanvasButton = memo(function OpenCanvasButton() {
  const {frameUrl, path, payload, scheme, zoom, viewport} = useWorkshop()

  const canvasUrl = useMemo(
    () =>
      path === '/'
        ? undefined
        : buildFrameUrl({baseUrl: frameUrl, path, payload, scheme, zoom, viewport}),
    [frameUrl, path, payload, scheme, zoom, viewport]
  )

  return (
    <Button
      as={canvasUrl ? 'a' : 'button'}
      disabled={!canvasUrl}
      fontSize={1}
      href={canvasUrl}
      iconRight={LaunchIcon}
      mode="ghost"
      padding={2}
      rel="noopener noreferrer"
      target="_blank"
      text="Open story"
    />
  )
})

const ViewportMenu = memo(function ViewportMenu() {
  const {broadcast, story, viewport} = useWorkshop()

  const setViewport = useCallback(
    (value: string) => {
      broadcast({type: 'workshop/setViewport', value})
    },
    [broadcast]
  )

  return (
    <MenuButton
      button={
        <Button
          disabled={!story}
          fontSize={1}
          iconRight={SelectIcon}
          mode="ghost"
          padding={2}
          style={{minWidth: 80}}
          text={VIEWPORT_OPTIONS.find((o) => o.name === viewport)?.title}
        />
      }
      id="viewport-menu"
      menu={
        <Menu>
          {VIEWPORT_OPTIONS.map((option) => (
            <MenuItem
              fontSize={1}
              key={option.name}
              onClick={() => setViewport(option.name)}
              padding={2}
              selected={option.name === viewport}
              text={option.title}
            />
          ))}
        </Menu>
      }
      popover={{matchReferenceWidth: true}}
      portal
    />
  )
})

const ZoomMenu = memo(function ZoomMenu() {
  const {broadcast, story, zoom} = useWorkshop()

  const setZoom = useCallback(
    (value: number) => {
      broadcast({type: 'workshop/setZoom', value})
    },
    [broadcast]
  )

  return (
    <MenuButton
      button={
        <Button
          disabled={!story}
          fontSize={1}
          iconRight={SelectIcon}
          mode="ghost"
          padding={2}
          style={{minWidth: 80}}
          text={ZOOM_OPTIONS.find((o) => o.value === zoom)?.title}
        />
      }
      id="zoom-menu"
      menu={
        <Menu>
          {ZOOM_OPTIONS.map((option) => (
            <MenuItem
              fontSize={1}
              key={option.value}
              onClick={() => setZoom(option.value)}
              padding={2}
              selected={option.value === zoom}
              text={option.title}
            />
          ))}
        </Menu>
      }
      popover={{matchReferenceWidth: true}}
      portal
    />
  )
})

const SchemeMenu = memo(function SchemeMenu() {
  const {broadcast, scheme} = useWorkshop()

  const handleToggleScheme = useCallback(() => {
    broadcast({type: 'workshop/toggleScheme'})
  }, [broadcast])

  return (
    <Button
      fontSize={1}
      icon={scheme === 'dark' ? MoonIcon : SunIcon}
      mode="bleed"
      onClick={handleToggleScheme}
      padding={2}
    />
  )
})
