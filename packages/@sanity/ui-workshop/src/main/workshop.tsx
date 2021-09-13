import {
  BoundaryElementProvider,
  Card,
  Flex,
  LayerProvider,
  PortalProvider,
  ToastProvider,
  useMediaIndex,
} from '@sanity/ui'
import {AxeResults} from 'axe-core'
import React, {useCallback, useEffect, useMemo, useReducer, useState} from 'react'
import {WORKSHOP_DEFAULT_FEATURES} from '../constants'
import {propsReducer} from '../props/reducer'
import {
  PropSchema,
  WorkshopCollection,
  WorkshopFeatures,
  WorkshopLocation,
  WorkshopScope,
} from '../types'
import {Inspector, InspectorDrawer} from './inspector'
import {Navbar} from './navbar/navbar'
import {Navigator, NavigatorDrawer} from './navigator'
import {StoryCanvas} from './storyCanvas'
import {useFrame} from './useFrame'
import {WorkshopProvider} from './workshopProvider'

export interface WorkshopProps {
  collections?: WorkshopCollection[]
  features?: Partial<WorkshopFeatures>
  frameUrl: string
  location: WorkshopLocation
  onLocationPush: (loc: WorkshopLocation) => void
  onLocationReplace: (loc: WorkshopLocation) => void
  scheme: 'dark' | 'light'
  scopes: WorkshopScope[]
  setScheme: (scheme: 'dark' | 'light') => void
  title: string
}

function _sortScopes(a: WorkshopScope, b: WorkshopScope) {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1

  return 0
}

export function Workshop(_props: WorkshopProps): React.ReactElement {
  const {
    collections,
    features: featuresProp = {},
    frameUrl,
    location,
    onLocationPush,
    onLocationReplace,
    scheme,
    scopes: scopesProp,
    setScheme,
    title,
  } = _props
  const features = useMemo(() => ({...WORKSHOP_DEFAULT_FEATURES, ...featuresProp}), [featuresProp])
  const mediaIndex = useMediaIndex()
  const {postMessage, ready, ref: frameRef, subscribe} = useFrame()
  const [props, dispatch] = useReducer(propsReducer, [])
  const [axeResults, setAxeResults] = useState<AxeResults | null>(null)
  const [viewport, setViewport] = useState<string>('auto')
  const [zoom, setZoom] = useState(1)
  const [boundaryElement, setBoundaryElement] = useState<HTMLDivElement | null>(null)
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null)
  const scopes = useMemo(() => scopesProp.sort(_sortScopes), [scopesProp])
  const [navigatorDrawerOpen, setNavigatorDrawerOpen] = useState(false)
  const [inspectorDrawerOpen, setInspectorDrawerOpen] = useState(false)

  const openNavigatorDrawer = useCallback(() => setNavigatorDrawerOpen(true), [])
  const closeNavigatorDrawer = useCallback(() => setNavigatorDrawerOpen(false), [])

  const openInspectorDrawer = useCallback(() => setInspectorDrawerOpen(true), [])
  const closeInspectorDrawer = useCallback(() => setInspectorDrawerOpen(false), [])

  useEffect(() => {
    if (mediaIndex >= 2) {
      setNavigatorDrawerOpen(false)
      setInspectorDrawerOpen(false)
    }
  }, [mediaIndex])

  const registerProp = useCallback((PropSchema: PropSchema) => {
    dispatch({type: 'registerProp', PropSchema})
  }, [])

  const unregisterProp = useCallback((PropName: string) => {
    dispatch({type: 'unregisterProp', PropName})
  }, [])

  const setPropValue = useCallback(
    (PropName: string, value: any) => {
      dispatch({type: 'setPropValue', PropName, value})
      postMessage({type: 'workshop/setPropValue', PropName, value})
    },
    [postMessage]
  )

  const _handleMsg = useCallback(
    (msg: Record<string, unknown>) => {
      if (typeof msg.type === 'string' && msg.type.startsWith('workshop/')) {
        if (msg.type === 'workshop/frame/axe/results') {
          setAxeResults(msg.results as any)
        }

        if (msg.type === 'workshop/frame/registerProp') {
          registerProp(msg.PropSchema as any)
        }

        if (msg.type === 'workshop/frame/setPropValue') {
          setPropValue(msg.PropName as string, msg.value)
        }

        if (msg.type === 'workshop/frame/unregisterProp') {
          unregisterProp(msg.PropName as any)
        }
      }
    },
    [registerProp, setPropValue, unregisterProp]
  )

  useEffect(() => {
    postMessage({type: 'workshop/setLocation', path: location.path, scheme})
  }, [location.path, postMessage, scheme])

  useEffect(() => {
    return subscribe((msg) => {
      if (typeof msg.type === 'string' && msg.type === 'queue') {
        const queue: any = msg.queue

        for (const _msg of queue) {
          _handleMsg(_msg)
        }
      } else {
        _handleMsg(msg)
      }
    })
  }, [_handleMsg, subscribe])

  return (
    <ToastProvider>
      <BoundaryElementProvider element={boundaryElement}>
        <PortalProvider element={portalElement}>
          <LayerProvider>
            <WorkshopProvider
              axeResults={axeResults}
              closeInspectorDrawer={closeInspectorDrawer}
              closeNavigatorDrawer={closeNavigatorDrawer}
              collections={collections}
              features={features}
              frameUrl={frameUrl}
              inspectorDrawer={inspectorDrawerOpen}
              location={location}
              navigatorDrawer={navigatorDrawerOpen}
              onLocationPush={onLocationPush}
              onLocationReplace={onLocationReplace}
              openInspectorDrawer={openInspectorDrawer}
              openNavigatorDrawer={openNavigatorDrawer}
              props={props}
              registerProp={registerProp}
              scheme={scheme}
              scopes={scopes}
              setScheme={setScheme}
              setViewport={setViewport}
              setZoom={setZoom}
              setPropValue={setPropValue}
              title={title}
              unregisterProp={unregisterProp}
              viewport={viewport}
              zoom={zoom}
            >
              <Flex direction="column" height="fill" overflow="hidden" ref={setBoundaryElement}>
                {features.navbar && <Navbar />}

                <Flex flex={1}>
                  <Card
                    borderRight
                    display={['none', 'none', 'block']}
                    flex={1}
                    overflow="auto"
                    style={{minWidth: 180, maxWidth: 300}}
                  >
                    <Navigator />
                  </Card>
                  <StoryCanvas frameRef={frameRef} ready={ready} />
                  <Card
                    borderLeft
                    display={['none', 'none', 'block']}
                    flex={1}
                    overflow="auto"
                    style={{minWidth: 180, maxWidth: 300}}
                  >
                    <Inspector />
                  </Card>
                </Flex>

                <div data-portal="" ref={setPortalElement} />
              </Flex>

              <NavigatorDrawer />
              <InspectorDrawer />
            </WorkshopProvider>
          </LayerProvider>
        </PortalProvider>
      </BoundaryElementProvider>
    </ToastProvider>
  )
}
