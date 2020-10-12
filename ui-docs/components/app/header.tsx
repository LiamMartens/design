import {Box, Code, Label, Stack, Text} from '@sanity/ui'
import Link from 'next/link'
import {useRouter} from 'next/router'
import React from 'react'
import styled from 'styled-components'

const Root = styled(Box)`
  overflow: auto;
  height: 100vh;
  position: sticky;
  top: 0;
`

function NavLink(props: {children: React.ReactNode; href: string}) {
  const router = useRouter()

  if (props.href === router.pathname) {
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
              <Text as="li" size={[2, 2, 3]}>
                Concepts
              </Text>
              <Text as="li" size={[2, 2, 3]}>
                Theme
              </Text>
            </Stack>
          </Stack>

          <Stack space={3}>
            <Label as="h2" size={[2, 2, 3]}>
              Atoms
            </Label>
            <Stack as="ul" space={3}>
              <AppHeaderLink href="/atoms/box">Box</AppHeaderLink>
              <AppHeaderLink href="/atoms/button">Button</AppHeaderLink>
              <AppHeaderLink href="/atoms/card">Card</AppHeaderLink>
              <AppHeaderLink href="/atoms/checkbox">Checkbox</AppHeaderLink>
              <AppHeaderLink href="/atoms/code">Code</AppHeaderLink>
              <AppHeaderLink href="/atoms/container">Container</AppHeaderLink>
              <AppHeaderLink href="/atoms/flex">Flex</AppHeaderLink>
              <AppHeaderLink href="/atoms/icon">Icon</AppHeaderLink>
              <AppHeaderLink href="/atoms/inline">Inline</AppHeaderLink>
              <AppHeaderLink href="/atoms/popover">Popover</AppHeaderLink>
              <AppHeaderLink href="/atoms/radio">Radio</AppHeaderLink>
              <AppHeaderLink href="/atoms/stack">Stack</AppHeaderLink>
              <AppHeaderLink href="/atoms/switch">Switch</AppHeaderLink>
              <AppHeaderLink href="/atoms/text">Text</AppHeaderLink>
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
        </Stack>
      </Box>
    </Root>
  )
}