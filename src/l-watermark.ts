import { PageConfig, ImageConfig, ErrorType } from './interface'
import PageWaterMark from './page'
import ImageWaterMark from './image'
import { decodeImage, ErrorMsg, url2img } from './utils'

class WaterMark {
  constructor() {
    return WaterMark
  }

  // 添加水印到图片
  static async image(config: ImageConfig.User) {
    try {
      // 不能同时为空
      if (!config.target && !config.image) {
        throw ErrorMsg.ParamsError("the 'target' and 'image' parameters cannot be undefined at the same time.")
      }

      // 将string类型的target转换成HTMLImageElement
      if (typeof config.target === 'string') {
        config.target = await url2img(config.target)
      }

      if (config.image) {
        // 图片水印
        const userConfig: ImageConfig.Image = {
          target: config.target as HTMLImageElement,
          image: config.image,
          imageWidth: config.imageWidth,
          imageHeight: config.imageHeight,
          secret: config.secret || false,
          position: config.position || 'repeat',
          cSpace: config.cSpace || 0,
          vSpace: config.vSpace || 0,
          success: config.success,
          onerror: config.onerror,
        }
        return new ImageWaterMark(userConfig, 'image')
      } else {
        // 文字水印
        const userConfig: ImageConfig.Text = {
          target: config.target as HTMLImageElement,
          text: config.text || 'Demo Text',
          secret: config.secret || false,
          position: config.position || 'repeat',
          color: config.color || 'rgba(0, 0, 0, 1)',
          fontSize: config.fontSize || 24,
          cSpace: config.cSpace || 0,
          vSpace: config.vSpace || 0,
          angle: config.angle || -25,
          success: config.success,
          onerror: config.onerror,
        }
        return new ImageWaterMark(userConfig, 'text')
      }
    } catch (err) {
      if ((err as ErrorType).code) {
        config.onerror && config.onerror(err as ErrorType)
      } else {
        config.onerror && config.onerror(ErrorMsg.UnknownError(JSON.stringify(err)))
      }
    }
  }

  // 添加水印到页面
  static page(config: PageConfig.User) {
    try {
      if (config.image) {
        // 图片水印
        const userConfig: PageConfig.Image = {
          image: config.image,
          containerEl: config.containerEl || document.body,
          zIndex: config.zIndex || '1000',
          cSpace: config.cSpace || 0,
          vSpace: config.vSpace || 0,
          onchange: config.onchange,
          onerror: config.onerror,
          success: config.success,
        }
        return new PageWaterMark(userConfig, 'image')
      } else {
        // 文字水印
        const userConfig: PageConfig.Text = {
          text: config.text || 'Demo Text',
          containerEl: config.containerEl || document.body,
          color: config.color || 'rgba(0, 0, 0, 0.15)',
          fontSize: config.fontSize || 24,
          zIndex: config.zIndex || '10000',
          cSpace: config.cSpace || 0,
          vSpace: config.vSpace || 0,
          angle: config.angle || -25,
          onchange: config.onchange,
          onerror: config.onerror,
          success: config.success,
        }
        return new PageWaterMark(userConfig, 'text')
      }
    } catch (err) {
      if ((err as ErrorType).code) {
        config.onerror && config.onerror(err as ErrorType)
      } else {
        config.onerror && config.onerror(ErrorMsg.UnknownError(JSON.stringify(err)))
      }
    }
  }

  // 添加水印到视频
  static video() {
    throw new Error('The function of adding watermarks to videos is not supported at present, please look forward to it.')
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
