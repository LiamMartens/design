import {Rect} from './types'

export function getElementScroll(element: HTMLElement): {left: number; top: number} {
  return {
    left: element.scrollLeft,
    top: element.scrollTop,
  }
}

export function getWindowScroll(): {left: number; top: number} {
  return {
    left: window.scrollX,
    top: window.scrollY,
  }
}

export function getRect(element: HTMLElement, scroll: {left: number; top: number}): Rect {
  const rect = element.getBoundingClientRect()

  return {
    top: rect.top + scroll.top,
    left: rect.left + scroll.left,
    right: rect.right + scroll.left,
    bottom: rect.bottom + scroll.top,
    width: rect.width,
    height: rect.height,
  }
}
