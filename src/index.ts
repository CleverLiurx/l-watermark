import { PageConfig, ImageConfig } from './types'
import PageWaterMark from './page'
import ImageWaterMark from './image'
import { decodeImage, initPageConfig, initImageConfig } from './utils'

class WaterMark {
  constructor() {
    return WaterMark
  }

  // 添加水印到图片
  static async image(config: ImageConfig.User) {
    try {
      const wmType = config.image ? 'image' : 'text'
      const userConfig = await initImageConfig(config)
      return new ImageWaterMark(userConfig, wmType)
    } catch (err) {
      config.onerror && config.onerror(`${err}`)
    }
  }

  // 添加水印到页面
  static page(config: PageConfig.User = {}) {
    try {
      const wmType = config.image ? 'image' : 'text'
      const userConfig = initPageConfig(config)
      return new PageWaterMark(userConfig, wmType)
    } catch (err) {
      config.onerror && config.onerror(`${err}`)
    }
  }

  static utils = {
    encodeImage: async (config: ImageConfig.User) => {
      let base64
      config.success = (data) => (base64 = data)
      await WaterMark.image(config)
      return base64
    },
    decodeImage,
  }
}

export default WaterMark
