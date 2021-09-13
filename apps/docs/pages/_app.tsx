import {AppProps} from 'next/app'
import React from 'react'
import Refractor from 'react-refractor'
import bash from 'refractor/lang/bash'
import javascript from 'refractor/lang/javascript'
import json from 'refractor/lang/json'
import jsx from 'refractor/lang/jsx'
import typescript from 'refractor/lang/typescript'
import {AppProvider} from '$components/app'
import {useDocsPageData, useGlobalPageData, useReferencePageData} from '$lib/page'

Refractor.registerLanguage(bash)
Refractor.registerLanguage(javascript)
Refractor.registerLanguage(json)
Refractor.registerLanguage(jsx)
Refractor.registerLanguage(typescript)

function App(props: AppProps) {
  const {pageProps} = props

  if (pageProps.scope === 'docs') {
    return <DocsApp {...props} />
  }

  if (pageProps.scope === 'reference') {
    return <ReferenceApp {...props} />
  }

  return <GlobalApp {...props} />
}

function GlobalApp(props: AppProps) {
  const {Component, pageProps} = props
  const pageData = useGlobalPageData(pageProps)

  return (
    <AppProvider {...pageData} params={pageProps.params || {}}>
      <Component {...pageProps} {...pageData} />
    </AppProvider>
  )
}

function DocsApp(props: AppProps) {
  const {Component, pageProps} = props
  const pageData = useDocsPageData(pageProps)

  return (
    <AppProvider {...pageData} params={pageProps.params || {}}>
      <Component {...pageProps} {...pageData} />
    </AppProvider>
  )
}

function ReferenceApp(props: AppProps) {
  const {Component, pageProps} = props
  const pageData = useReferencePageData(pageProps)

  return (
    <AppProvider {...pageData} params={pageProps.params || {}}>
      <Component {...pageProps} {...pageData} />
    </AppProvider>
  )
}

export default App
