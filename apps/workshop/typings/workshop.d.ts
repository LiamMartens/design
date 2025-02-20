declare module '$packages' {
  export const packages: Record<
    string,
    | {
        name: string
        version: string
        description: string
      }
    | undefined
  >
}

declare module '$workshop' {
  import {WorkshopScope} from '@sanity/ui-workshop'

  export const scopes: WorkshopScope[]
}
