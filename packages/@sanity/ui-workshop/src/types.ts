import {AxeResults} from 'axe-core'
import React from 'react'

export interface WorkshopFeatures {
  navbar: boolean
}

export interface WorkshopStory {
  name: string
  title: string
  component: React.ComponentType
}

export interface WorkshopScope {
  name: string
  title: string
  stories: WorkshopStory[]
}

export interface WorkshopCollection {
  name: string
  title: string
}

export interface GenericPropSchema<T = unknown> {
  name: string
  defaultValue?: T
  groupName?: string
}

export interface BooleanPropSchema extends GenericPropSchema<boolean> {
  type: 'boolean'
}

export interface NumberPropSchema extends GenericPropSchema<number> {
  type: 'number'
}

export type SelectPropValue = string | number | boolean

// interface SelectPropOptionsProp<T> {
//   [key: string]: T
// }

export type SelectPropOptionsProp<T extends SelectPropValue = SelectPropValue> =
  | Record<PropertyKey, T>
  | Record<Extract<T, PropertyKey>, T[keyof T]>
  | T[]
  | readonly T[]

export interface SelectPropSchema<T extends SelectPropValue = SelectPropValue>
  extends GenericPropSchema<T> {
  type: 'select'
  options: SelectPropOptionsProp<T>
}

export interface StringPropSchema extends GenericPropSchema<string> {
  type: 'string'
}

export interface TextPropSchema extends GenericPropSchema<string> {
  type: 'text'
}

export type PropSchema =
  | BooleanPropSchema
  | NumberPropSchema
  | SelectPropSchema
  | StringPropSchema
  | TextPropSchema

export interface StoryProp {
  schema: PropSchema
  value: any
}

export interface ScopeContextValue {
  scope: WorkshopScope | null
  story: WorkshopStory | null
  props: StoryProp[]
  registerProp: (Prop: PropSchema) => void
  setPropValue: (PropName: string, value: any) => void
  // title: string
  unregisterProp: (PropName: string) => void
}

export interface WorkshopLocation {
  path: string
}

export interface WorkshopContextValue {
  axeResults: AxeResults | null
  closeInspectorDrawer: () => void
  closeNavigatorDrawer: () => void
  collections?: WorkshopCollection[]
  frameUrl: string
  inspectorDrawer: boolean
  location: WorkshopLocation
  navigatorDrawer: boolean
  openInspectorDrawer: () => void
  openNavigatorDrawer: () => void
  pushLocation: (loc: WorkshopLocation) => void
  replaceLocation: (loc: WorkshopLocation) => void
  scheme: 'light' | 'dark'
  scope: WorkshopScope | null
  scopes: WorkshopScope[]
  setScheme: (s: 'light' | 'dark') => void
  setViewport: (v: string) => void
  setZoom: (z: number) => void
  story: WorkshopStory | null
  title: string
  viewport: string
  zoom: number
}
