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

class WaterMark {
  constructor() {
    throw new Error('实例化水印错误：请调用WaterMark的静态方法(page/image/video)进行加载水印！')
  }

  static image(config: UserImageWaterMarkConfig) {
    // image字段权重大于text

    if (config.image) {
      // 图片水印
      const defaultConfig: Image2Image = {
        image: config.image,
        secret: false,
        position: 'repeat',
        cSpace: 0,
        vSpace: 0,
      }
      let configs: Image2Image = { ...defaultConfig, ...config }
      return new ImageWaterMark(configs)
    } else {
      // 文字水印
      const defaultConfig: Text2Image = {
        text: config.text || '默认水印',
        secret: false,
        position: 'repeat',
        color: 'rgba(0, 0, 0, 1)',
        fontSize: 24,
        cSpace: 0,
        vSpace: 0,
        angle: -25,
      }
      let configs: Text2Image = { ...defaultConfig, ...config }
      return new ImageWaterMark(configs)
    }
  }

  static page(config: UserPageWaterMarkConfig) {
    // image字段权重大于text

    if (config.image) {
      // 图片水印
      const defaultConfig: Image2Page = {
        image: config.image,
        containerEl: document.body,
        zIndex: '10000',
        cSpace: 0,
        vSpace: 0,
      }
      let configs: Image2Page = { ...defaultConfig, ...config }
      return new PageWaterMark(configs)
    } else {
      // 文字水印
      let defaultConfig: Text2Page = {
        text: config.text || '默认水印',
        containerEl: document.body,
        color: 'rgba(0, 0, 0, 0.15)',
        fontSize: 24,
        zIndex: '10000',
        cSpace: 0,
        vSpace: 0,
        angle: -25,
      }
      const configs: Text2Page = { ...defaultConfig, ...config }
      return new PageWaterMark(configs)
    }
  }

  static video() {
    throw new Error('暂不支持视频添加水印功能，敬请期待！')
  }
}

export default WaterMark
