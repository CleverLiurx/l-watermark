import { UserWaterMarkConfig } from './types'
import PageWaterMark from './page'
import ImageWaterMark from './image'
import { fillConfig } from './utils'

class WaterMark {
  private constructor() {}

  static init: (
    config: UserWaterMarkConfig
  ) => Promise<ImageWaterMark | PageWaterMark | undefined> = async (config) => {
    try {
      const configs = await fillConfig(config)
      const target = configs.target
      if (target.nodeName === 'IMG') {
        return new ImageWaterMark(configs, configs.image ? 'image' : 'text')
      }
      return new PageWaterMark(configs, configs.image ? 'image' : 'text')
    } catch (err) {
      config.onerror && config.onerror(`${err}`)
    }
  }

  // static utils = {
  //   encodeImage: async (config: ImageConfig.User) => {
  //     let base64
  //     config.success = (data) => (base64 = data)
  //     await WaterMark.image(config)
  //     return base64
  //   },
  //   decodeImage,
  // }
}

export default WaterMark