import {mix} from 'polished'
import {ColorHueConfig} from '../types'

/**
 * @internal
 */
export function getColorHex(config: ColorHueConfig, tint: string): string {
  const {stops: stopsMap = {}} = config

  const tintNum = Number(tint)

  const midPoint = config.midPoint || 500

  if (!stopsMap[0]) {
    stopsMap[0] = config.lightest || '#fff'
  }

  if (!stopsMap[midPoint]) {
    stopsMap[midPoint] = config.mid
  }

  if (!stopsMap[1000]) {
    stopsMap[1000] = config.darkest || '#000'
  }

  const stops: [number, string][] = []

  const stopsArr = Object.entries(stopsMap)

  stopsArr.forEach(([tintKey, value]) => {
    if (value) {
      stops.push([Number(tintKey), value])
    }
  })

  // const stops: [number, string][] = [
  //   [0, config.stops && config.stops[0] || config.lightest],
  //   [midPoint, config.mid],
  //   [1000, config.darkest],
  // ]

  // sort stops
  stops.sort((a, b) => {
    return a[0] - b[0]
  })

  // console.log(stops)

  let before: any = null
  let after: any = null

  for (const point of stops) {
    if (point[0] <= tintNum) {
      before = point
    }

    if (point[0] >= tintNum) {
      after = point
      break
    }
  }

  if (before === after) {
    return before[1].toLowerCase()
  }

  const diff = after[0] - before[0]

  const index = (tintNum - before[0]) / diff

  // console.log(tintNum, {diff, index, before, after})

  return mix(index, after[1], before[1])

  // const stops: Partial<Record<ColorTintKey, string>> = {
  //   [0]: config.darkest,
  //   []
  // }

  // const darkSize = 1000 - midPoint
  // const lightPosition = tintNum / midPoint
  // const darkPosition = (tintNum - midPoint) / darkSize

  // if (tintNum === 0) {
  //   return config.lightest
  // }

  // if (tintNum === 1000) {
  //   return config.darkest
  // }

  // if (tintNum === midPoint) {
  //   return config.mid.toLowerCase()
  // }

  // // light side of scale: x < midPoint
  // if (tintNum < midPoint) {
  //   return mix(lightPosition, config.mid, config.lightest)
  // }

  // // dark side of scale: x > midPoint
  // return mix(darkPosition, config.darkest, config.mid)
}
