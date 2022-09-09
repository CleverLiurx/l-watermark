import { WaterMarkConfig } from './types'
import { GuardDom } from './utils'
import { text2page, image2page } from './core'

class PageWaterMark {
  observe?: GuardDom

  constructor(config: WaterMarkConfig, wmType: 'image' | 'text') {
    if (wmType === 'image') {
      // 将图片添加到页面
      this.observe = image2page(config)
    } else {
      // 将文字添加到页面
      this.observe = text2page(config)
    }
    this.observe?.start()
  }

  remove() {
    this.observe?.stop()
  }
}

export default PageWaterMark
