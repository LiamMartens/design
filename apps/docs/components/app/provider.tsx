import {
  LayerProvider,
  studioTheme,
  ThemeColorSchemeKey,
  ThemeProvider,
  ToastProvider,
  usePrefersDark,
} from '@sanity/ui'
import React, {useEffect, useMemo, useState} from 'react'
import {AppContext} from './context'
import {GlobalStyle} from './globalStyle'
import {zOffsets} from './zOffsets'
import {NavMenu} from '$lib/nav'

export function AppProvider(props: {
  children?: React.ReactNode
  data: unknown
  loading: boolean
  menu?: NavMenu
  params: Record<string, any>
}) {
  const {children, data, loading, menu, params} = props
  const prefersDark = usePrefersDark()
  const [colorScheme, setColorScheme] = useState<ThemeColorSchemeKey>(
    prefersDark ? 'dark' : 'light'
  )

  useEffect(() => setColorScheme(prefersDark ? 'dark' : 'light'), [prefersDark])

  const contextValue = useMemo(
    () => ({colorScheme, data, loading, menu, params, setColorScheme, zOffsets}),
    [colorScheme, data, loading, menu, params, setColorScheme]
  )

  return (
    <ThemeProvider scheme={colorScheme} theme={studioTheme}>
      <GlobalStyle />
      <AppContext.Provider value={contextValue}>
        <LayerProvider>
          <ToastProvider zOffset={zOffsets.toast}>{children}</ToastProvider>
        </LayerProvider>
      </AppContext.Provider>
    </ThemeProvider>
  )
}
