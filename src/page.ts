import { WaterMarkConfig } from './types'
import { Guard } from './utils'
import { text2page, image2page } from './core'

class PageWatermark {
  observe?: Guard

  constructor(config: WaterMarkConfig, wmType: 'image' | 'text') {
    if (wmType === 'image') {
      // 给页面添加图片水印
      this.observe = image2page(config)
    } else {
      // 给页面添加文字水印
      this.observe = text2page(config)
    }
    // 开始监控水印变化
    this.observe?.start()
  }

  // 停止监控并移除水印
  remove() {
    this.observe?.stop()
  }
}

export default PageWatermark
