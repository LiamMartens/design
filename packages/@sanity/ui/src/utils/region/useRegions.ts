import {useContext} from 'react'
import {OverlayContext, OverlayContextValue} from './regionContext'

export function useOverlay(): OverlayContextValue {
  const overlayContext = useContext(OverlayContext)

  if (!overlayContext) {
    throw new Error('Overlay: missing context value')
  }

  return overlayContext
}
