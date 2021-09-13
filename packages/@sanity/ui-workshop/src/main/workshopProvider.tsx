import {AxeResults} from 'axe-core'
import React, {useMemo} from 'react'
import {resolveLocation} from '../resolveLocation'
import {ScopeProvider} from '../scopeProvider'
import {
  PropSchema,
  StoryProp,
  WorkshopCollection,
  WorkshopFeatures,
  WorkshopLocation,
  WorkshopScope,
} from '../types'
import {WorkshopContext} from '../workshopContext'

export interface WorkshopProviderProps {
  axeResults: AxeResults | null
  children: React.ReactNode
  closeInspectorDrawer: () => void
  closeNavigatorDrawer: () => void
  collections?: WorkshopCollection[]
  features?: WorkshopFeatures
  frameUrl: string
  inspectorDrawer: boolean
  location: WorkshopLocation
  navigatorDrawer: boolean
  onLocationPush: (loc: WorkshopLocation) => void
  onLocationReplace: (loc: WorkshopLocation) => void
  openInspectorDrawer: () => void
  openNavigatorDrawer: () => void
  props: StoryProp[]
  registerProp: (PropSchema: PropSchema) => void
  scheme: 'light' | 'dark'
  scopes: WorkshopScope[]
  setScheme: (s: 'light' | 'dark') => void
  setViewport: (v: string) => void
  setZoom: (z: number) => void
  setPropValue: (PropName: string, value: any) => void
  title: string
  unregisterProp: (PropName: string) => void
  viewport: string
  zoom: number
}

export function WorkshopProvider(_props: WorkshopProviderProps): React.ReactElement {
  const {
    axeResults,
    children,
    closeInspectorDrawer,
    closeNavigatorDrawer,
    collections,
    features = {},
    frameUrl,
    inspectorDrawer,
    location,
    navigatorDrawer,
    onLocationPush,
    onLocationReplace,
    openInspectorDrawer,
    openNavigatorDrawer,
    props,
    registerProp,
    scheme,
    scopes,
    setScheme,
    setViewport,
    setZoom,
    setPropValue,
    title,
    unregisterProp,
    viewport,
    zoom,
  } = _props

  const contextValue = useMemo(() => {
    const {scope, story} = resolveLocation(scopes, location.path)

    return {
      axeResults,
      closeInspectorDrawer,
      closeNavigatorDrawer,
      collections,
      features,
      frameUrl,
      inspectorDrawer,
      location,
      navigatorDrawer,
      openInspectorDrawer,
      openNavigatorDrawer,
      pushLocation: onLocationPush,
      replaceLocation: onLocationReplace,
      scheme,
      scope,
      scopes,
      setScheme,
      setViewport,
      setZoom,
      story,
      title,
      viewport,
      zoom,
    }
  }, [
    axeResults,
    closeInspectorDrawer,
    closeNavigatorDrawer,
    collections,
    features,
    frameUrl,
    inspectorDrawer,
    location,
    navigatorDrawer,
    onLocationPush,
    onLocationReplace,
    openInspectorDrawer,
    openNavigatorDrawer,
    scheme,
    scopes,
    setScheme,
    setViewport,
    setZoom,
    title,
    viewport,
    zoom,
  ])

  return (
    <WorkshopContext.Provider value={contextValue}>
      <ScopeProvider
        props={props}
        registerProp={registerProp}
        scope={contextValue.scope}
        setPropValue={setPropValue}
        story={contextValue.story}
        title={title}
        unregisterProp={unregisterProp}
      >
        {children}
      </ScopeProvider>
    </WorkshopContext.Provider>
  )
}
