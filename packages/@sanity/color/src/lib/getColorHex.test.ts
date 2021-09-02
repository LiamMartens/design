import {ColorHueConfig} from '../types'
import {getColorHex} from './getColorHex'

describe('getColorHex', () => {
  it('should …', () => {
    const config: ColorHueConfig = {
      darkest: '#000000',
      mid: '#777777',
      lightest: '#ffffff',
      midPoint: 500,
      title: 'Gray',
      // points: {
      //   [500]: '#777777',
      // },
    }

    expect(getColorHex(config, '0')).toBe('#ffffff')
    expect(getColorHex(config, '50')).toBe('#f1f1f1')
    expect(getColorHex(config, '500')).toBe('#777777')
    expect(getColorHex(config, '950')).toBe('#0b0b0b')
    expect(getColorHex(config, '1000')).toBe('#000000')
  })
})
