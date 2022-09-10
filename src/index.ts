import { UserWaterMarkConfig } from './types'
import PageWaterMark from './page'
import ImageWatermark from './image'
import { initConfig, decodeImage } from './utils'

class WaterMark {
  static init: (config: UserWaterMarkConfig) => Promise<void | PageWaterMark> = async (config) => {
    try {
      // 根据用户输入的配置生成完整的水印配置
      const configs = await initConfig(config)
      const target = configs.target
      if (target.nodeName === 'IMG') {
        // 给图片添加水印
        await ImageWatermark(configs, configs.image ? 'image' : 'text')
      }
      // 给页面添加水印
      return new PageWaterMark(configs, configs.image ? 'image' : 'text')
    } catch (err) {
      config.onerror && config.onerror(`${err}`)
    }
  }

  static utils = {
    decodeImage,
  }
}

export default WaterMark
