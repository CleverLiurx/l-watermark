import { PageConfig, ImageConfig, UserWaterMarkConfig, WaterMarkConfig } from './types'
import PageWaterMark from './page'
import ImageWaterMark from './image'
import { decodeImage, initPageConfig, initImageConfig, fillConfig } from './utils'

class WaterMark {
  constructor(config: UserWaterMarkConfig) {
    // @ts-ignore
    return this.init(config)
  }

  async init(config: UserWaterMarkConfig) {
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

  // // 添加水印到图片
  // static async image(config: ImageConfig.User) {
  //   try {
  //     const wmType = config.image ? 'image' : 'text'
  //     const userConfig = await initImageConfig(config)
  //     return new ImageWaterMark(userConfig, wmType)
  //   } catch (err) {
  //     config.onerror && config.onerror(`${err}`)
  //   }
  // }

  // // 添加水印到页面
  // static page(config: PageConfig.User = {}) {
  //   try {
  //     const wmType = config.image ? 'image' : 'text'
  //     const userConfig = initPageConfig(config)
  //     return new PageWaterMark(userConfig, wmType)
  //   } catch (err) {
  //     config.onerror && config.onerror(`${err}`)
  //   }
  // }

  static utils = {
    // encodeImage: async (config: ImageConfig.User) => {
    //   let base64
    //   config.success = (data) => (base64 = data)
    //   await WaterMark.image(config)
    //   return base64
    // },
    // decodeImage,
  }
}

export default WaterMark
