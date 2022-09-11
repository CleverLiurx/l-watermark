import { WaterMarkConfig } from './types'
import { Guard } from './utils'
import { text2page, image2page } from './core'

const PageWatermark = (config: WaterMarkConfig, wmType: 'image' | 'text') => {
  // 添加水印
  let observe: Guard = wmType === 'image' ? image2page(config) : text2page(config)
  // 开始监控水印变化
  observe?.start()
  return {
    remove: () => {
      observe?.stop()
    }
  }
}


export default PageWatermark
