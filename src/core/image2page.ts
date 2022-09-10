import { WaterMarkConfig } from '../types'
import { createWatermark, observeWatermark } from '../utils'

export const image2page = (config: WaterMarkConfig) => {
  const watermark = createWatermark(config)
  const observe = observeWatermark(watermark, config)
  return observe
}
