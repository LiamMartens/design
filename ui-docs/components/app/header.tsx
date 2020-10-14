import {Box, Code, Label, Stack, Switch, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'
import {atomRoutes} from '../../routes'
import {useApp} from './hooks'

const Root = styled(Box)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

function NavLink(props: {children: React.ReactNode; href: string}) {
  const router = useRouter()

  if (props.href === router.asPath) {
    return <>{props.children}</>
  }

  return (
    <Link href={props.href}>
      <a>{props.children}</a>
    </Link>
  )
}

function AppHeaderLink({children, href}: {children: React.ReactNode; href: string}) {
  return (
    <Text as="li" size={[2, 2, 3]}>
      <NavLink href={href}>{children}</NavLink>
    </Text>
  )
}

export function AppHeader() {
  const {setThemeMode, themeMode} = useApp()

  return (
    <Root data-name="AppHeader" forwardedAs="header">
      <Box as="nav" paddingX={[5]} paddingY={[5, 5, 6, 7]}>
        <Stack space={5}>
          <Stack space={3}>
            <Code as="h1" size={[2, 2, 3]}>
              <strong>@sanity/ui</strong>
            </Code>

            <a href="https://www.npmjs.com/package/@sanity/ui">
              <img src="https://img.shields.io/npm/v/@sanity/ui.svg?style=flat-square" />
            </a>
          </Stack>

          <Stack space={3}>
            <Stack as="ul" space={3}>
              <AppHeaderLink href="/">Introduction</AppHeaderLink>
              <AppHeaderLink href="/concepts">Concepts</AppHeaderLink>
              <AppHeaderLink href="/theme">Theme</AppHeaderLink>
            </Stack>
          </Stack>

          <Stack space={3}>
            <Label as="h2" size={[2, 2, 3]}>
              Atoms
            </Label>
            <Stack as="ul" space={3}>
              {atomRoutes.map((route) => (
                <AppHeaderLink href={`/atoms/${route.slug}`} key={route.slug}>
                  {route.title}
                </AppHeaderLink>
              ))}
            </Stack>
          </Stack>

          <Stack space={3}>
            <Label as="h2" size={[2, 2, 3]}>
              Components
            </Label>
            <Stack as="ul" space={3}>
              <AppHeaderLink href="/components/dialog">Dialog</AppHeaderLink>
            </Stack>
          </Stack>

          <Stack space={3}>
            <Label as="h2" size={[2, 2, 3]}>
              Hooks
            </Label>
            <Stack as="ul" space={3}>
              <AppHeaderLink href="/hooks/use-click-outside">useClickOutside</AppHeaderLink>
            </Stack>
          </Stack>

          <Stack space={3}>
            <Label as="h2" size={[2, 2, 3]}>
              Utils
            </Label>
            <Stack as="ul" space={3}>
              <AppHeaderLink href="/utils/layer">Layer</AppHeaderLink>
              <AppHeaderLink href="/utils/portal">Portal</AppHeaderLink>
            </Stack>
          </Stack>

          <div>
            <Switch
              checked={themeMode === 'dark'}
              onChange={(event) => {
                if (event.currentTarget.checked) {
                  setThemeMode('dark')
                } else {
                  setThemeMode('light')
                }
              }}
            />
          </div>
        </Stack>
      </Box>
    </Root>
  )
}
