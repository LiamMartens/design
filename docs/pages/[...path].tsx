import Head from 'next/head'
import React from 'react'
import {AppLayout, Article, Screen, useApp} from '$components'
import {PageLayout} from '$components'
import {PREVIEW} from '$features'
import {getNavItems} from '$lib/nav'
import {loadPageData, loadPagePaths} from '$lib/page'

export async function getStaticProps(opts: {params?: {path?: string[]}; preview?: boolean}) {
  const {params = {}, preview = PREVIEW} = opts
  const data = await loadPageData({params, preview})

  return {props: {...data, params, preview}}
}

export async function getStaticPaths() {
  const paths = await loadPagePaths({preview: PREVIEW})

  return {paths, fallback: false}
}

export default function PathPage(props: {params: {path: string[]}}) {
  const {params = {path: []}} = props
  const {nav, target} = useApp()
  const structure = getNavItems(nav.items || [])
  const currentStructure = structure.find((n) => n.segment === params.path[0])

  return (
    <>
      <Head>
        {target && <title>{target.title} – Sanity Design</title>}
        {!target && 'Missing target – Sanity Design'}
      </Head>

      <AppLayout>
        {target._type === 'article' && (
          <PageLayout structure={currentStructure} {...(target.layout || {})}>
            <Article article={target} />
          </PageLayout>
        )}

        {target._type === 'screen' && <Screen target={target} />}
      </AppLayout>
    </>
  )
}