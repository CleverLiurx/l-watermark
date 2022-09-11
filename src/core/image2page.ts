import { WaterMarkConfig } from '../types'
import { createWatermark, observeWatermark, Guard } from '../utils'

/**
 * @description 向页面中添加图片水印
 * @param config 水印配置
 * @return 监视器observe
 */

export const image2page: (config: WaterMarkConfig) => Guard =(config) => {
  const watermark = createWatermark(config)
  const observe = observeWatermark(watermark, config)
  return observe
}
