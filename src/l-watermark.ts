import {
  UserPageWaterMarkConfig,
  UserImageWaterMarkConfig,
  Text2Page,
  Image2Page,
  Text2Image,
  Image2Image,
} from './interface'
import PageWaterMark from './page'
import ImageWaterMark from './image'
import { decodeImage } from './utils'

class WaterMark {
  constructor() {
    return WaterMark
  }

  // 添加水印到图片
  static async image(config: UserImageWaterMarkConfig) {
    // 将string类型的target转换为HTMLImageElement
    if (!(config.target as HTMLImageElement).src) {
      const img = new Image()
      img.setAttribute('crossorigin', 'crossorigin')
      img.src = config.target as string
      await new Promise<void>((resolve) => {
        img.onload = () => {
          config.target = img
          resolve()
        }
      })
    }

    // 图片水印
    if (config.image) {
      const userConfig: Image2Image = {
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
    }

    // 文字水印
    const userConfig: Text2Image = {
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

  // 添加水印到页面
  static page(config: UserPageWaterMarkConfig) {
    // 图片水印: 有image字段即为图片水印
    if (config.image) {
      const defaultConfig: Image2Page = {
        image: config.image,
        containerEl: document.body,
        zIndex: '10000',
        cSpace: 0,
        vSpace: 0,
      }
      let configs: Image2Page = { ...defaultConfig, ...config }
      return new PageWaterMark(configs, 'image')
    }

    // 文字水印
    const defaultConfig: Text2Page = {
      text: config.text || 'Demo Text',
      containerEl: document.body,
      color: 'rgba(0, 0, 0, 0.15)',
      fontSize: 24,
      zIndex: '10000',
      cSpace: 0,
      vSpace: 0,
      angle: -25,
    }
    const configs: Text2Page = { ...defaultConfig, ...config }
    return new PageWaterMark(configs, 'text')
  }

  // 添加水印到视频
  static video() {
    throw new Error('暂不支持视频添加水印功能，敬请期待！')
  }

  static utils = {
    encodeImage: async (config: UserImageWaterMarkConfig) => {
      let base64
      config.success = (data) => (base64 = data)
      await WaterMark.image(config)
      return base64
    },
    decodeImage,
  }
}

export default WaterMark
