import { UserWaterMarkConfig } from './types'
import PageWaterMark from './page'
import ImageWatermark from './image'
import { initConfig, decodeImage } from './utils'

class WaterMark {

  static init: (config: UserWaterMarkConfig) => Promise<void | PageWaterMark> = async (config) => {
    try {
      const configs = await initConfig(config)
      const target = configs.target
      if (target.nodeName === 'IMG') {
        await ImageWatermark(configs, configs.image ? 'image' : 'text')
      }
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
