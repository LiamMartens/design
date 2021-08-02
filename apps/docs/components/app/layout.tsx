import {ArrowRightIcon, Icon} from '@sanity/icons'
import {Card, Flex, Text} from '@sanity/ui'
import Link from 'next/link'
import {AppFooter} from './footer'
import {useApp} from './hooks'
import {AppNavbar} from './navbar'
import {isRecord} from '$lib/types'

export function AppLayout({children}: {children: React.ReactNode}) {
  return (
    <Flex direction="column" height="fill">
      <AppBanner />
      <AppNavbar />
      <Card flex={1} style={{minHeight: 'auto'}}>
        {children}
      </Card>
      <AppFooter />
    </Flex>
  )
}

function AppBanner() {
  const {data} = useApp()
  const settings = isRecord(data) && data.settings
  const banner = settings && (settings as any).banner

  if (!banner || banner.hidden) return null

  return (
    <Card padding={3} tone="transparent" style={{minHeight: 'auto'}}>
      <Text align="center" size={1}>
        {(banner.icon || banner.title) && (
          <strong>
            {banner.icon && (
              <>
                <Icon symbol={banner.icon} />
                &nbsp;&nbsp;{' '}
              </>
            )}
            {banner.title}
          </strong>
        )}

        {banner.link?.title && banner.link?.href && (
          <>
            {' '}
            <Link href={banner.link?.href}>
              <a>
                {banner.link.title} <ArrowRightIcon />
              </a>
            </Link>
          </>
        )}
      </Text>
    </Card>
  )
}
