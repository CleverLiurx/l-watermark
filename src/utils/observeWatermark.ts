import { WaterMarkConfig } from '../types'
import { GuardDom } from '../utils'

export const observeWatermark = (watermark: HTMLDivElement, config: WaterMarkConfig) => {
  const { onchange, success } = config
  const observe = new GuardDom(watermark, onchange)
  success()
  return observe
}
