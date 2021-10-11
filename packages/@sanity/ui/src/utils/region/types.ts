export interface Rect {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
}

export interface IntersectionData {
  isAbove: boolean
  isBelow: boolean
  isVisible: boolean
}

export interface RegionData {
  id: string
  intersection: IntersectionData
  params: unknown
  rect: Rect
}
