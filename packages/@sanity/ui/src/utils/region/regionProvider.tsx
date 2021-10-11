import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {_isScrollable} from '../../helpers'
import {getRect, getElementScroll, getWindowScroll} from './helpers'
import {OverlayContext, OverlayContextValue} from './regionContext'
import {IntersectionData, Rect, RegionData} from './types'

/**
 * @beta
 */
export interface OverlayProviderProps {
  children?: React.ReactNode
  onChange?: (regions: RegionData[]) => void
  rootMargin?: string
  rootRef: React.RefObject<HTMLDivElement>
  scrollRef: React.RefObject<HTMLDivElement>
}

const MUTATION_OBSERVER_CONFIG = {
  attributes: true,
  characterData: true,
  childList: true,
  subtree: true,
}

function getScrollElement(element: HTMLElement): HTMLElement | null {
  let _scrollEl = element.parentNode

  while (_scrollEl && !_isScrollable(_scrollEl)) {
    _scrollEl = _scrollEl.parentNode
  }

  if (_scrollEl instanceof HTMLElement) {
    return _scrollEl
  }

  return null
}

/**
 * @beta
 */
export const OverlayProvider = React.memo((props: OverlayProviderProps) => {
  const {children, onChange, rootMargin, rootRef, scrollRef} = props
  const [rect, setRect] = useState<{width: number; height: number}>({width: 0, height: 0})
  const [ids, setIds] = useState<string[]>([])
  const rootRectRef = useRef<Rect | null>(null)
  const intersectionsRef = useRef<Record<string, IntersectionData>>({})
  const rectsRef = useRef<Record<string, Rect>>({})
  const paramsRef = useRef<Record<string, unknown>>({})
  const regionMap = useRef<Record<string, {id: string; element: HTMLElement}>>({})
  const idMap = useMemo(() => new WeakMap(), [])
  const regions = useMemo(() => {
    return ids.map((id) => ({
      id,
      rect: rectsRef.current[id],
      intersection: intersectionsRef.current[id],
      params: paramsRef.current[id],
    }))
  }, [ids])

  // Keep references to observers
  const ioRef = useRef<IntersectionObserver | null>(null)
  const roRef = useRef<ResizeObserver | null>(null)
  const moRef = useRef<MutationObserver | null>(null)

  // Create `observe` callback
  const observe = useCallback(
    (id: string, element: HTMLElement) => {
      idMap.set(element, id)
      regionMap.current[id] = {id, element}
      if (ioRef.current) ioRef.current.observe(element)
      if (roRef.current) roRef.current.observe(element)
      setIds((ids) => ids.concat([id]))
    },
    [idMap]
  )

  const setParams = useCallback((id: string, params: unknown) => {
    paramsRef.current[id] = params

    // trigger update
    setIds((val) => val.slice(0))
  }, [])

  // Create `unobserve` callback
  const unobserve = useCallback((id: string, element: HTMLElement) => {
    if (ioRef.current) ioRef.current.unobserve(element)
    if (roRef.current) roRef.current.unobserve(element)
    delete regionMap.current[id]
    delete intersectionsRef.current[id]
    delete rectsRef.current[id]
    delete paramsRef.current[id]
    setIds((ids) => ids.filter((k) => k !== id))
  }, [])

  // Setup regionMap
  useEffect(() => {
    const rootElement = rootRef.current
    // const scrollElement = scrollRef.current

    if (!rootElement) {
      return
    }

    const rootScrollElement = getScrollElement(rootElement)

    rootRectRef.current = getRect(
      rootElement,
      rootScrollElement ? getElementScroll(rootScrollElement) : getWindowScroll()
    )

    const updateRects = () => {
      const rootScrollElement = getScrollElement(rootElement)

      const rootRect = getRect(
        rootElement,
        rootScrollElement ? getElementScroll(rootScrollElement) : getWindowScroll()
      )

      rootRectRef.current = rootRect

      const regions = Object.values(regionMap.current)

      let changed = false

      regions.forEach((region) => {
        const currRect = rectsRef.current[region.id] || {}
        const scrollElement = getScrollElement(region.element)
        const scroll = scrollElement ? getElementScroll(scrollElement) : getWindowScroll()
        const rect = getRect(region.element, scroll)

        const top = rect.top - rootRect.top
        const left = rect.left - rootRect.left
        const bottom = rect.bottom - rootRect.top
        const right = rect.right - rootRect.left
        const width = rect.width
        const height = rect.height

        if (
          currRect.top !== top ||
          currRect.left !== left ||
          currRect.width !== width ||
          currRect.height !== height
        ) {
          rectsRef.current[region.id] = {
            top,
            left,
            width,
            height,
            bottom,
            right,
          }

          changed = true
        }
      })

      setRect({width: rootRect.width, height: rootRect.height})

      if (changed) {
        // trigger update
        setIds((val) => val.slice(0))
      }
    }

    // intersect
    const handleIntersect: IntersectionObserverCallback = (entries) => {
      if (!regionMap.current) return

      entries.forEach((entry) => {
        const id = idMap.get(entry.target)
        const observer = id && regionMap.current[id]

        if (observer) {
          if (!entry.rootBounds) {
            return
          }

          intersectionsRef.current[observer.id] = {
            isAbove: entry.boundingClientRect.top < entry.rootBounds.top,
            isBelow: entry.boundingClientRect.bottom > entry.rootBounds.bottom,
            isVisible: !(
              entry.boundingClientRect.bottom < entry.rootBounds.top ||
              entry.boundingClientRect.top > entry.rootBounds.bottom
            ),
          }
        } else {
          // eslint-disable-next-line no-console
          console.warn(`IntersectionObserver: no observer found for element`, entry.target)
        }
      })

      // trigger update
      setIds((val) => val.slice(0))
    }

    // intersect
    ioRef.current = new IntersectionObserver(handleIntersect, {
      root: scrollRef && scrollRef.current,
      rootMargin: rootMargin || '0px',
      threshold: [0, 1],
    })

    Object.values(regionMap.current).forEach((observer) => ioRef.current?.observe(observer.element))

    // resize
    roRef.current = new ResizeObserver(updateRects)
    roRef.current.observe(rootElement)
    Object.values(regionMap.current).forEach((observer) => roRef.current?.observe(observer.element))

    // mutate
    moRef.current = new MutationObserver(updateRects)
    moRef.current.observe(rootElement, MUTATION_OBSERVER_CONFIG)

    // scroll
    rootElement.addEventListener('scroll', updateRects, true)

    return () => {
      if (ioRef) {
        ioRef.current?.disconnect()
        ioRef.current = null
      }

      if (roRef) {
        roRef.current?.disconnect()
        roRef.current = null
      }

      if (moRef) {
        moRef.current?.disconnect()
        moRef.current = null
      }

      // scroll
      rootElement.removeEventListener('scroll', updateRects)
    }
  }, [idMap, rootMargin, rootRef, scrollRef])

  useEffect(() => {
    if (onChange) onChange(regions)
  }, [onChange, regions])

  const contextValue: OverlayContextValue = useMemo(
    () => ({observe, rect, regions, setParams, unobserve}),
    [observe, rect, regions, setParams, unobserve]
  )

  return <OverlayContext.Provider value={contextValue}>{children}</OverlayContext.Provider>
})
