import React, {useEffect, useRef} from 'react'
import styled from 'styled-components'
import {useOverlay} from './useRegions'

/**
 * @beta
 */
export interface RegionProps {
  children?: React.ReactNode
  id: string
  params?: unknown
}

const Root = styled.div``

/**
 * @beta
 */
export function Region(props: RegionProps): React.ReactElement {
  const {children, id, params, ...restProps} = props
  const {observe, setParams, unobserve} = useOverlay()
  const ref = useRef<HTMLDivElement | null>(null)

  if (!id) {
    throw new Error('Missing `id` property')
  }

  useEffect(() => {
    const element = ref.current

    if (!element) {
      return
    }

    observe(id, element)

    return () => {
      unobserve(id, element)
    }
  }, [observe, unobserve, id])

  useEffect(() => {
    setParams(id, params)
  }, [setParams, id, params])

  return (
    <Root {...restProps} data-ui="Region" data-id={id} ref={ref}>
      {children}
    </Root>
  )
}
