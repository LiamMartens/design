import {createContext} from 'react'
import {RegionData} from './types'

export interface OverlayContextValue {
  observe: (id: string, element: HTMLElement) => void
  rect: {width: number; height: number}
  regions: RegionData[]
  setParams: (id: string, params: unknown) => void
  unobserve: (id: string, element: HTMLElement) => void
}

export const OverlayContext = createContext<OverlayContextValue | null>(null)
