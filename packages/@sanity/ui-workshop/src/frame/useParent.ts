import {useCallback, useMemo, useRef} from 'react'

export function useParent(): {postMessage: (msg: any) => void} {
  const messageQueueRef = useRef<any[]>([])
  const flushTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const _flushMessageQueue = useCallback(() => {
    if (flushTimeoutRef.current) return

    flushTimeoutRef.current = setTimeout(() => {
      const queue = messageQueueRef.current

      messageQueueRef.current = []
      flushTimeoutRef.current = null

      if (queue.length === 1) {
        parent?.postMessage(queue[0], window.location.origin)
      } else {
        parent?.postMessage({type: 'workshop/queue', queue}, window.location.origin)
      }
    }, 0)
  }, [])

  const postMessage = useCallback(
    (msg: any) => {
      messageQueueRef.current.push(msg)
      _flushMessageQueue()
    },
    [_flushMessageQueue]
  )

  return useMemo(() => ({postMessage}), [postMessage])
}
