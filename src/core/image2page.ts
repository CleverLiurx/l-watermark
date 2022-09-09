import { WaterMarkConfig } from '../types'
import { getTextSize, drawWatermark, observeWatermark } from '../utils'

export const image2page = (config: WaterMarkConfig) => {
  const watermark = drawWatermark(config)
  const observe = observeWatermark(watermark, config)
  return observe
}
