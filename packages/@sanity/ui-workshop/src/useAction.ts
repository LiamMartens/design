import {useCallback} from 'react'
import {useScope} from './useScope'

export function useAction(name: string): (...args: any[]) => void {
  const {scope, story} = useScope()

  return useCallback(
    (...args: any[]) => {
      if (!scope || !story) return

      // eslint-disable-next-line no-console
      console.log(`[${scope.name}/${story.name}]`, name, ...args)
    },
    [scope, story, name]
  )
}
